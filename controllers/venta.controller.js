const Venta = require('../models/Venta')
const db = require('../repositorio/models')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const express = require("express")
const { stringify } = require('uuid')

const { emitirComprobanteAfip } = require('../services/afip.service.js')
const { realizarPagoTarjeta } = require('../services/tarjeta.service.js')
const { postNewSale, getDatosClientesParaEmisionDeComprobante, getLineasDeVentaParaEmisionDeComprobante } = require('../services/database.service.js')


const createVenta = async (req, res, next) => {

  try {

    
  // const venta = new Venta()

  const vendedor = await db.Vendedores.findByPk(req.user.vendedorId)

  const PDV = await db.PuntosDeVenta.findByPk(vendedor.puntoDeVentaId)

  const sucursal = await db.Sucursales.findByPk(PDV.sucursalId)
        
   const ventadb = await db.Ventas.create({vendedorId: vendedor.id, PDVId: PDV.id, 
    sucursalId: sucursal.id})

    
   
   return res.json(makeSuccessResponse(ventadb))


  } catch (err) {
    next(err)
  }

       
}
  



const ingresarCliente = async (req, res, next) => {

  try {

    const {clienteId, ventaId } = req.body

    const ventadb = await db.Ventas.findByPk(ventaId)

    if(!ventadb){

    
    return res.status(404).json(makeErrorResponse([`Venta con id ${ventaId} no encontrada.`]))
   }

   const cliente = await db.Clientes.findByPk(clienteId)
    
   if(!cliente){

    
    return res.status(404).json(makeErrorResponse([`Cliente con id ${clienteId} no encontrado.`]))
   }

   if(ventadb.clienteId != null){

    
    return res.status(404).json(makeErrorResponse([`Ya se encuentra un cliente asignado a esta venta.`]))
   }

   venta = new Venta()

    
   venta.asociarCliente(cliente)
   
  
   await ventadb.update({ clienteId: clienteId, tipoComprobante: venta.tipoComprobante});
   

   // apicache.clear()

   
   return res.json(makeSuccessResponse(ventadb))


  } catch (err) {
    next(err)
  }

       
}




//GET http://localhost:8080/Ventas
const getAllVentas = async (req, res, next) => {
   try{
    const ventas = await db.Ventas.findAll()
    
    res.json(makeSuccessResponse(ventas))
}catch(err){
    next(err)
}
}


//GET http://localhost:8080/api/Ventas/id
const getVentaById = async (req, res, next) => {
   
    try{
        const VentaId = req.params.id

        const venta = await db.Ventas.findByPk(VentaId)

    if(!venta){

    
    return res.status(404).json(makeErrorResponse([`Venta con id ${VentaId} no encontrada.`]))
   }
   
    
   res.json(makeSuccessResponse(venta))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:8080/api/Ventas/id
const deleteVentaById = async (req, res, next) => {
    try {
      const VentaId = req.params.id
  
      // Verifica si la Venta existe
      const VentaExistente = await Venta.findById(VentaId)
      if (!VentaExistente) {
        return res.status(404).json(makeErrorResponse([`Venta con id ${VentaId} no encontrada.`]))
      }
      // Elimina la Venta de la base de datos
      await Venta.findByIdAndDelete(VentaId)
  
      
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Venta eliminada correctamente']))

      //res.json(VentaExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:8080/api/Ventas/id
  const patchVentaById = async (req, res, next) => {
    try{
    
    const VentaId = req.params.id
    // Encuentra el índice del autor con el ID especificado
    const VentaExistente = await Venta.findById(VentaId)
    if (!VentaExistente) {
        return res.status(404).json(makeErrorResponse([`Venta con id ${VentaId} no encontrada.`]))
      }
     
       // actualiza el autor de la base de datos
       await Venta.findByIdAndUpdate(VentaId, {
        
        "fecha": req.body.fecha,
        "pago": req.body.pago,
        "estado": req.body.estado,
        "cliente": req.body.cliente,
        "total": req.body.total
      })
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Venta actualizada correctamente']))

       
    } catch (err) {
      next(err)
    }
}




const finalizarVenta = async (req, res, next) => {
  
 
  

  const { tipoPago, token , ventaId } = req.query


 
 // Iniciar una transacción
 const t = await db.sequelize.transaction();

  try {

    const ventadb = await db.Ventas.findByPk(ventaId, { transaction: t });

    // Verificar si la venta existe
    if (!ventadb) {
      // Revertir la transacción y enviar respuesta de error
      await t.rollback();
      return res.status(404).json(makeErrorResponse(['No se encontró una venta para el ID introducido.']));
    }


    if (ventadb.estado === 'FINALIZADA') {
      // Revertir la transacción y enviar respuesta de error
      await t.rollback();
      return res.status(404).json(makeErrorResponse(['La venta ya se encuentra finalizada.']));
    }

    

    let pago

    venta = new Venta()

      const lineasDeArticulosdb = await db.lineasDeArticulos.findAll({
      where: { ventaId }}, {transaction: t});

    await Promise.all(lineasDeArticulosdb.map(async (linea) => {
      if (ventaId == linea.ventaId) {
        const articulo = await db.Articulos.findByPk(linea.articuloId);
        if (articulo) {  // Asegúrate de que el artículo exista
          venta.agregarLineaDeVenta(linea.cantidad, articulo);

          await db.Stocks.update(
            { cantidad: db.sequelize.literal(`cantidad - ${linea.cantidad}`) },
            { where: { articuloId: linea.articuloId,
              colorId: linea.colorId,
              talleId: linea.talleId, }, transaction: t}
          );




        } else {
          console.error(`No se encontró el artículo con ID ${linea.articuloId}`);
        }
      }
    }));

    let total = venta.calcularTotal()

    let site_transaction 


    if(tipoPago == 'EFECTIVO'){
     
       pago = await db.Pagos.create({ monto: total, tipo: tipoPago }, { transaction: t });

       await ventadb.update({ fecha: new Date(), estado: 'FINALIZADA', pagoId: pago.id, total: total }, { transaction: t });
    }

    if(tipoPago == 'TARJETA'){

     const ultimoPago = await db.PagosTarjetas.findOne({
        order: [['createdAt', 'DESC']] // Orden descendente por la columna createdAt
      });
      

      if(!ultimoPago){

        site_transaction = 156
      }else{
        site_transaction = ultimoPago.site_transaction_id + 1
      }

       // Construir el cuerpo de la solicitud a la siguiente dirección
       const requestBody = {
        site_transaction_id: String(site_transaction),
        payment_method_id: 1,
        token,
        bin: "450799",
        amount: total, // Convertir amount a número
        currency: "ARS",
        installments: 1,
        description: "",
        payment_type: "single",
        establishment_name: "single",
        sub_payments: [{
            site_id: "",
            amount: total, // Convertir amount a número
            installments: null
        }]
    };

    // Definir los encabezados personalizados
    const headers = {
        "Content-Type": "application/json",
        "apikey": "566f2c897b5e4bfaa0ec2452f5d67f13",
        "Cache-Control": "no-cache"
    };

    // Realizar la solicitud a la siguiente dirección
    const response = await fetch("https://developers.decidir.com/api/v2/payments", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();
    console.log(responseData)

     // Verificar si la solicitud fue exitosa
     if (response.ok) {

                
       pago = await db.PagosTarjetas.create({ id: responseData.id, site_transaction_id: responseData.site_transaction_id, card_brand: responseData.card_brand
        , amount: responseData.amount, currency: responseData.currency, status: responseData.status, date: responseData.date }, { transaction: t });
  

        await ventadb.update({ fecha: new Date(), estado: 'FINALIZADA', pagoTarjetaId: pago.id, total: total }, { transaction: t });

  } else {
      // Si la solicitud falla, enviar el estado de error y el mensaje
      await t.rollback();
      return res.status(404).json(makeErrorResponse(['No se pudo procesar el pago.']));
  }

     
      
    }



   

    const sucursal = await db.Sucursales.findByPk(ventadb.sucursalId, { transaction: t });
    const PDV = await db.PuntosDeVenta.findByPk(ventadb.PDVId, { transaction: t });
    const vendedor = await db.Vendedores.findByPk(ventadb.vendedorId, { transaction: t });
    const cliente = await db.Clientes.findByPk(ventadb.clienteId, { transaction: t });
   

    
 // Confirmar la transacción
 await t.commit();
   
   // Construir el objeto de respuesta
   const responseData = {
    fecha: ventadb.fecha,
    estado: ventadb.estado,
    total: ventadb.total,
    tipoComprobante: ventadb.tipoComprobante,
    nroComprobante: ventadb.nroComprobante,
    cliente: {
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      domicilio: cliente.domicilio,
      CUIT: cliente.CUIT,

    },
    pago: pago,
    sucursal: sucursal.descripcion,
    PDV: PDV.numero,
    vendedor: {
      nombre: vendedor.nombre,
      apellido: vendedor.apellido,
      legajo: vendedor.legajo,
    },
    lineasDeArticulosdb: lineasDeArticulosdb, // Agregar las líneas de artículos a la respuesta
  };

  // Retornar la respuesta exitosa con los datos adicionales
  return res.json(makeSuccessResponse(responseData));

  
  } catch (err) {
   
    console.error(err);

    // Revertir la transacción en caso de error y pasar el error al siguiente middleware
    await t.rollback();
    next(err);
  }

       
}




const buscarVentaMasReciente = async (req, res) => {

  const {ventaId} = req.query

  const venta = await Venta.findOne({cliente : ventaId})  

  res.json(venta)
}



const realizarVenta = async(req, res, next) => {

  const t = await db.sequelize.transaction();

  const { lineasDeVenta, tarjeta, monto, clienteCuit } = req.body

  const { tipoPago } = req.query

  try{

    // Si es pago con tarjeta se llama al servicio 'realizarPagoTarjeta'. Caso contrario continúa
    let paymentResponse

    if (tipoPago == "TARJETA") {
      const dni = clienteCuit.substring(2, clienteCuit.lenght)
      paymentResponse = await realizarPagoTarjeta(tarjeta, dni, monto)
    } else {
      paymentResponse = null
    }

    // Emisión de comprobantes de AFIP
    const comprobanteResponse = await emitirComprobanteAfip(monto, clienteCuit)

    //console.log(comprobanteResponse)

    // Se guarda la nueva venta en la base de datos
    const nuevaVenta = await postNewSale( tipoPago, lineasDeVenta, monto, clienteCuit, paymentResponse, comprobanteResponse, t )

    const datosCliente = await getDatosClientesParaEmisionDeComprobante(clienteCuit)
    //console.log(datosCliente)

    

    const datosLineasDeVenta = await getLineasDeVentaParaEmisionDeComprobante(nuevaVenta.id, t)
    //console.log(datosLineasDeVenta)

    const datosComprobante = {
      lineasDeVenta: datosLineasDeVenta,
      clienteCuit: clienteCuit,
      clienteCondicionTributaria: 'CONSUMIDOR FINAL', // No se pueden generar bien los caes nominales. Se usaran todas facturas tipo B a consumidor final por el momento
      tipoComprobante: comprobanteResponse.tipoComprobante,
      nroCae: comprobanteResponse.cae,
      fechaVencimientoCae: comprobanteResponse.fechaDeVencimiento,
      totalNetoGravado: comprobanteResponse.importeNeto,
      totalIva: comprobanteResponse.importeIva,
      totalVenta: comprobanteResponse.importeTotal,
      fechaDeEmision: nuevaVenta.updatedAt
    }

    //await t.rollback()

    t.commit()

    console.log(datosComprobante)
    

    //console.log(nuevaVenta)

    return res.status(200).json(makeSuccessResponse(datosComprobante));

  } catch(err) {

      await t.rollback();
      console.log(err)
      return await res.status(404).json(makeErrorResponse([err.message]));
  }
}



module.exports = {
    getAllVentas,
    createVenta,
    getVentaById,
    patchVentaById,
    deleteVentaById,
    finalizarVenta,
    buscarVentaMasReciente,
    ingresarCliente,
    realizarVenta
}