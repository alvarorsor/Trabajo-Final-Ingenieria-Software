const db = require('../repositorio/models')
const sequelize = db.sequelize
const LineaDeArticulo = require('../models/LineaDeArticulo')
const { Op } = require('sequelize')
const sucursalRouter = require('../routes/sucursal.routes')

const getSiteTransaccionId = async () => {
    const ultimoPago = await db.PagosTarjetas.findOne({
        order: [['createdAt', 'DESC']] // Orden descendente por la columna createdAt
      });
    
      if(!ultimoPago){
        return Math.floor(Math.random() * 10000) + 1
      }else{
        return Math.floor(Math.random() * 10000) + 1
        //return ultimoPago.site_transaction_id + 1
      }
    }

const postNewSale = async( tipoPago, lineasDeVenta, monto, clienteCuit, paymentResponse, comprobanteResponse, t, vendedorId ) => {

    const cliente = await db.Clientes.findOne({
        where: { CUIT: {[Op.eq]: BigInt(clienteCuit)}}
      })
      
      const salesman = await db.Vendedores.findByPk(vendedorId)
      const pdv = await db.PuntosDeVenta.findByPk(salesman.puntoDeVentaId) 
      const sucursal = await db.Sucursales.findByPk(pdv.sucursalId)
    
    // Crear venta en la base de datos

    const venta = await db.Ventas.create({
        fecha: new Date(), estado: 'FINALIZADA', total: monto/100, clienteId: cliente.id, vendedorId: vendedorId, PDVId: pdv.id, sucursalId: sucursal.id
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

    const comprobante = await db.Comprobantes.create(
        {
          cae: comprobanteResponse.cae,
          numero: comprobanteResponse.nroComprobante,
          estado: comprobanteResponse.estado,
          tipoId: tipoComprobanteId.id
        },
        { transaction: t }
    )

    await venta.update({ comprobanteId: comprobante.id }, { transaction: t })

    if (tipoPago == "EFECTIVO") {

        const pago = await db.Pagos.create({ monto: parseInt(monto/100), tipo: tipoPago }, { transaction: t });
  
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

    return venta
}

const getDatosClientesParaEmisionDeComprobante = async (clienteCuit) => {

  try {

      const clientInfo = await sequelize.query(
          'SELECT clientes.id, clientes.CUIT, condicionestributarias.descripcion as condicionTributaria FROM clientes ' +
          'JOIN condicionestributarias ON condicionestributarias.id = clientes.condicionTributariaId ' +
          'WHERE clientes.CUIT = :clienteCuit LIMIT 1',
          {
            replacements: { clienteCuit: BigInt(clienteCuit) }
          }
      )

      const returnClientInfo = clientInfo[0] // Esto es por que la query anterior devuelve un array con la respuesta repetida. Solo nos interesa el primero

      if(returnClientInfo.length == 0){
          throw Error(`No se ha encontrado el cliente con CUIT ${clienteCuit}`)
      }

      return returnClientInfo[0]

  } catch (err) {
    console.log(err)
  }

}

const getLineasDeVentaParaEmisionDeComprobante = async (ventaId, t) => {

  try {

      const lineasDeVenta = await sequelize.query(
          "SELECT lv.id AS id, a.codigo AS codigoArticulo, lv.cantidad AS cantidad, subTotal, " +
          "CONCAT(a.descripcion, ' ', m.descripcion, ' ', c.descripcion, ' ', t.descripcion) AS descripcion, " +
          "CAST(ROUND(subTotal / 1.21) AS UNSIGNED) AS precioUnitario, '%21' AS iva " +
          "FROM lineasdearticulos AS lv " +
          "JOIN stocks AS s ON lv.stockId = s.id " +
          "JOIN articulos AS a ON s.articuloId = a.id " +
          "JOIN marcas AS m ON a.marcaId = m.id " +
          "JOIN colores AS c ON s.colorId = c.id " +
          "JOIN talles AS t ON s.talleId = t.id " +
          "WHERE lv.ventaId = :ventaId;",
          {
            replacements: { ventaId: ventaId },
            transaction: t
          }
      )

      const returnLineasDeVenta = lineasDeVenta[0] // Esto es por que la query anterior devuelve un array con la respuesta repetida. Solo nos interesa el primero

      if(returnLineasDeVenta.length == 0){
          throw Error(`No se han encontradon lineas de venta de la venta de id ${ventaId}`)
      }

      return returnLineasDeVenta

  } catch (err) {
    console.log(err)
  }

}

module.exports = {
    getSiteTransaccionId,
    postNewSale,
    getDatosClientesParaEmisionDeComprobante,
    getLineasDeVentaParaEmisionDeComprobante
}
