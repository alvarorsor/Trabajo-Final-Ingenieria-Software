const db = require('../repositorio/models')
const LineaDeArticulo = require('../models/LineaDeArticulo')
const { Op } = require('sequelize')

const getSiteTransaccionId = async () => {
    const ultimoPago = await db.PagosTarjetas.findOne({
        order: [['createdAt', 'DESC']] // Orden descendente por la columna createdAt
      });
    
      if(!ultimoPago){
        return Math.floor(Math.random() * 10000) + 1
      }else{
        return ultimoPago.site_transaction_id + 1
      }
    }

const postNewSale = async( tipoPago, lineasDeVenta, monto, clienteCuit, paymentResponse, comprobanteResponse, t ) => {

    const cliente = await db.Clientes.findOne({
        where: { CUIT: {[Op.eq]: BigInt(clienteCuit)}}
      })
    
    // Crear venta en la base de datos

    const venta = await db.Ventas.create({
        fecha: new Date(), estado: 'FINALIZADA', total: monto, clienteId: cliente.id
    }, {transaction: t})

    // Agregar lineas de venta a la base de datos y modificar stock

    await Promise.all(lineasDeVenta.map(async (lineaDeVenta) => {

        const stock = await db.Stocks.findByPk(lineaDeVenta.stockId, {transaction: t})
        const articulo = await db.Articulos.findByPk(stock.articuloId, {transaction: t})
  
        var lineaDeArticulo = new LineaDeArticulo({cantidad: lineaDeVenta.cantidad, articulo: articulo})
  
        let subTotal =  lineaDeArticulo.calcularSubTotal()
  
        await db.lineasDeArticulos.create(
          { cantidad: lineaDeVenta.cantidad, stockId: lineaDeVenta.stockId, subTotal: subTotal, tipo: "VENTA", ventaId: venta.id }, 
          { transaction: t }
        )
  
        await stock.update({ cantidad: stock.cantidad - lineaDeVenta.cantidad}, { transaction: t });
    }));

    const tipoComprobanteId = await db.TipoComprobantes.findOne({descripcion: comprobanteResponse.tipoComprobante})

    await db.Comprobantes.create(
        {
          cae: comprobanteResponse.cae,
          numero: comprobanteResponse.nroComprobante,
          estado: comprobanteResponse.estado,
          tipoId: tipoComprobanteId.id
        },
        { transaction: t }
    )

    await venta.update({ nroComprobante: comprobanteResponse.cae }, { transaction: t })

    if (tipoPago == "EFECTIVO") {

        const pago = await db.Pagos.create({ monto: parseInt(monto), tipo: tipoPago }, { transaction: t });
  
        await venta.update({pagoId: pago.id}, { transaction: t });
    }

    if (tipoPago == "TARJETA") {

        const pago = await db.PagosTarjetas.create({ 
            id: paymentResponse.id, site_transaction_id: paymentResponse.site_transaction_id, card_brand: paymentResponse.card_brand, 
            amount: paymentResponse.amount, currency: paymentResponse.currency, status: paymentResponse.status, date: paymentResponse.date },
            { transaction: t }
        );
          
        await venta.update({pagoTarjetaId: pago.id }, { transaction: t });
    }
}

module.exports = {
    getSiteTransaccionId,
    postNewSale
}
