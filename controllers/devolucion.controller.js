const moment = require('moment-timezone');
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')
const mongoose = require('mongoose')
const Devolucion = require('../models/Devolucion')
const db = require('../repositorio/models')


const createDevolucion = async (req, res, next) => {

  try {

    
    const vendedor = await db.Vendedores.findByPk(req.user.vendedorId)

    const PDV = await db.PuntosDeVenta.findByPk(vendedor.puntoDeVentaId)
  
    const sucursal = await db.Sucursales.findByPk(PDV.sucursalId)
          
     const devoluciondb = await db.Devoluciones.create({vendedorId: vendedor.id, PDVId: PDV.id, 
      sucursalId: sucursal.id})
  
        
    
   
   // apicache.clear()

   
   return res.json(makeSuccessResponse(devoluciondb))


  } catch (err) {
    next(err)
  }

       
}
  



const ingresarCliente = async (req, res, next) => {

  try {

    const {clienteId, devolucionId } = req.body

    const devoluciondb = await db.Devoluciones.findByPk(devolucionId)

    if(!devoluciondb){

    
    return res.status(404).json(makeErrorResponse([`Devolucion con id ${devolucionId} no encontrada.`]))
   }

   const cliente = await db.Clientes.findByPk(clienteId)
    
   if(!cliente){

    
    return res.status(404).json(makeErrorResponse([`Cliente con id ${clienteId} no encontrado.`]))
   }

   if(devoluciondb.clienteId){

    
    return res.status(404).json(makeErrorResponse([`Ya se encuentra un cliente asignado a esta Devolucion.`]))
   }


    
   devolucion = new Devolucion()

    
   devolucion.asociarCliente(cliente)
   
  
   await devoluciondb.update({ clienteId: clienteId, tipoComprobante: devolucion.tipoComprobante});
   

   // apicache.clear()

   
   return res.json(makeSuccessResponse(devoluciondb))


  } catch (err) {
    next(err)
  }

       
}




//GET http://localhost:8080/Devolucions
const getAllDevolucions = async (req, res, next) => {
   try{
    const devoluciones = await Devolucion.findAll()
    
    res.json(makeSuccessResponse(devoluciones))
}catch(err){
    next(err)
}
}


//GET http://localhost:8080/api/Devolucions/id
const getDevolucionById = async (req, res, next) => {
   
    try{
        const devolucionId = req.params.id

    const devolucion = await Devolucion.findByPk(devolucionId)

    if(!devolucion){

    
    return res.status(404).json(makeErrorResponse([`Devolucion con id ${devolucionId} no encontrada.`]))
   }
   
    
   res.json(makeSuccessResponse(devolucion))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:8080/api/Devolucions/id
const deleteDevolucionById = async (req, res, next) => {
    try {
      const devolucionId = req.params.id
  
      // Verifica si la Devolucion existe
      const DevolucionExistente = await Devolucion.findById(devolucionId)
      if (!DevolucionExistente) {
        return res.status(404).json(makeErrorResponse([`Devolucion con id ${devolucionId} no encontrada.`]))
      }
      // Elimina la Devolucion de la base de datos
      await Devolucion.findByIdAndDelete(devolucionId)
  
      
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Devolucion eliminada correctamente']))

      //res.json(DevolucionExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:8080/api/Devolucions/id
  const patchDevolucionById = async (req, res, next) => {
    try{
    
    const devolucionId = req.params.id
    // Encuentra el índice del autor con el ID especificado
    const DevolucionExistente = await Devolucion.findById(devolucionId)
    if (!DevolucionExistente) {
        return res.status(404).json(makeErrorResponse([`Devolucion con id ${devolucionId} no encontrada.`]))
      }
     
       // actualiza el autor de la base de datos
       await Devolucion.findByIdAndUpdate(devolucionId, {
        
        "fecha": req.body.fecha,
        "pago": req.body.pago,
        "estado": req.body.estado,
        "cliente": req.body.cliente,
        "total": req.body.total
      })
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Devolucion actualizada correctamente']))

       
    } catch (err) {
      next(err)
    }
}






const finalizarDevolucion = async (req, res, next) => {
  
 
  

  const { tipoPago, devolucionId } = req.body

 
 // Iniciar una transacción
 const t = await db.sequelize.transaction();

  try {

    const devoluciondb = await db.Devoluciones.findByPk(devolucionId, { transaction: t });

    // Verificar si la venta existe
    if (!devoluciondb) {
      // Revertir la transacción y enviar respuesta de error
      await t.rollback();
      return res.status(404).json(makeErrorResponse(['No se encontró una devolucion para el ID introducido.']));
    }


    if (devoluciondb.estado === 'FINALIZADA') {
      // Revertir la transacción y enviar respuesta de error
      await t.rollback();
      return res.status(404).json(makeErrorResponse(['La devolucion ya se encuentra finalizada.']));
    }


    let precio_devolucion=0
    let precio_cambio=0

      const lineasDeArticulosdb = await db.lineasDeArticulos.findAll({
      where: { devolucionId }}, {transaction: t});

    await Promise.all(lineasDeArticulosdb.map(async (linea) => {
      if (devolucionId == linea.devolucionId) {

        if(linea.tipo == 'DEVOLUCION'){

          await db.Stocks.update(
            { cantidad: db.sequelize.literal(`cantidad + ${1}`) },
            { where: { articuloId: linea.articuloId,
              colorId: linea.colorId,
              talleId: linea.talleId,
               }, transaction: t}
          );

         const articulo_devolucion = await db.Articulos.findByPk(linea.articuloId);

         precio_devolucion = articulo_devolucion.precio_venta
        }

        if(linea.tipo == 'CAMBIO'){

          await db.Stocks.update(
            { cantidad: db.sequelize.literal(`cantidad - ${1}`) },
            { where: { articuloId: linea.articuloId,
              colorId: linea.colorId,
              talleId: linea.talleId, }, transaction: t}
          );
          const articulo_cambio = await db.Articulos.findByPk(linea.articuloId);

          precio_cambio = articulo_cambio.precio_venta
        }

        
      }
    }));



   let total = precio_cambio - precio_devolucion

    const pago = await db.Pagos.create({ monto: total, tipo: tipoPago }, { transaction: t });

    await devoluciondb.update({ fecha: new Date(), estado: 'FINALIZADA', pagoId: pago.id, total }, { transaction: t });

    const sucursal = await db.Sucursales.findByPk(devoluciondb.sucursalId, { transaction: t });
    const PDV = await db.PuntosDeVenta.findByPk(devoluciondb.PDVId, { transaction: t });
    const vendedor = await db.Vendedores.findByPk(devoluciondb.vendedorId, { transaction: t });
    const cliente = await db.Clientes.findByPk(devoluciondb.clienteId, { transaction: t });
   

    
 // Confirmar la transacción
 await t.commit();
   
   // Construir el objeto de respuesta
   const responseData = {
    fecha: devoluciondb.fecha,
    estado: devoluciondb.estado,
    total: devoluciondb.total,
    tipoComprobante: devoluciondb.tipoComprobante,
    nroComprobante: devoluciondb.nroComprobante,
    cliente: {
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      domicilio: cliente.domicilio,
      CUIT: cliente.CUIT,

    },
    pago: {
      monto: pago.monto,
      tipo: pago.tipo
    },
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




const buscarDevolucionMasReciente = async (req, res) => {

  const {DevolucionId} = req.query

  const Devolucion = await Devolucion.findOne({cliente : DevolucionId})  

  res.json(Devolucion)
}



module.exports = {
    getAllDevolucions,
    createDevolucion,
    getDevolucionById,
    patchDevolucionById,
    deleteDevolucionById,
    finalizarDevolucion,
    buscarDevolucionMasReciente,
    ingresarCliente
    
}