const LineaDeArticulo = require('../models/LineaDeArticulo')
const Venta = require('../models/Venta')
const db = require('../repositorio/models')
const Devolucion = require('../models/Devolucion')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')




//POST http://localhost:3000/api/createlineaDeVenta/
const agregarlineaDeVenta = async (req, res, next) => {
    
       
        
  const { talleId, colorId, articuloId, cantidad, ventaId } = req.body
 
 

  try {

     var venta = new Venta()
       
    
    
    const ventadb = await db.Ventas.findByPk(ventaId)
     
  
    

    // Verificar si la venta existe
    if (!venta) {
        return res.status(404).json(makeErrorResponse(['No se encontró una venta para el id introducido.']));
    }

    if (ventadb.estado == "FINALIZADA") {
      return res.status(404).json(makeErrorResponse(['La venta ya se encuentra finalizada, no se puede introducir una linea de venta.']));
  }
    
  
  // Verificar si ya existe una línea de venta con los mismos atributos
  const existingLineaDeVenta = await db.lineasDeArticulos.findOne({
    where: {
      ventaId,
      articuloId,
      colorId,
      talleId,
    },
  });

  if (existingLineaDeVenta) {
    return res.status(400).json(makeErrorResponse(['Ya se ha agregado una línea de venta con los mismos atributos.']));
  }

  let vendedorId = req.user.vendedorId

  const vendedor = await db.Vendedores.findByPk(vendedorId)
    
  const PDV = await db.PuntosDeVenta.findByPk(vendedor.puntoDeVentaId)

    const sucursal = await db.Sucursales.findByPk(PDV.sucursalId)

  const stocks = await db.Stocks.findAll({
    where: {
      // Aquí defines tu condición
      sucursalId: sucursal.id
    }
  });
  


    
   
    let mensajeError = null;
    
    let banderaStock = 0

    let lineaDeArticulodb
   
    
      //iterar sobre los stocks 
      for (const stock of stocks) {
       
        if (stock.talleId ==talleId && stock.colorId ==colorId  && stock.articuloId ==articuloId ) {
           
          banderaStock = 1

          
        if (stock.cantidad >= cantidad) {

        //venta.agregarLineaDeVenta(cantidad, color, talle, articulo)

        const articulodb = await db.Articulos.findByPk(articuloId)

        var lineaDeArticulo = new LineaDeArticulo({cantidad: cantidad, articulo: articulodb})

        let subTotal =  lineaDeArticulo.calcularSubTotal()

        lineaDeArticulodb = await db.lineasDeArticulos.create({cantidad: cantidad, talleId: talleId, colorId: colorId, articuloId: articuloId, 
          subTotal: subTotal, tipo: "VENTA", ventaId: ventaId})

         
    break;  // Salir del bucle ya que la línea fue agregada
  } else {
      mensajeError = 'No hay stock suficiente para la cantidad introducida.';
  }
} 



  }


  
  if(banderaStock === 0){
    mensajeError = 'No existe stock en esta sucursal para el color y talle introducidos.';
    
  }
  
    


    if (mensajeError) {
      return res.status(404).json(makeErrorResponse([mensajeError]));
    }

   
   // apicache.clear();

  
    
    res.json(makeSuccessResponse(lineaDeArticulodb));
  
   
  } catch (error) {
   
    res.status(400).json({ error: error.message });
  }
      
    
}




const agregarLineaDevolucion = async (req, res, next) => {
    
  const { talleId, colorId, articuloId, devolucionId } = req.body
 
 
  try {
       
    
    const devolucion = await db.Devoluciones.findByPk(devolucionId)
    

    // Verificar si la Devolucion existe
    if (!devolucion) {
        return res.status(404).json(makeErrorResponse(['No se encontró una Devolucion para el id introducido.']));
    }

    if (devolucion.estado == "FINALIZADA") {
      return res.status(404).json(makeErrorResponse(['La Devolucion ya se encuentra finalizada, no se puede introducir una linea de Devolucion.']));
  }
    
  
  let vendedorId = req.user.vendedorId

  const vendedor = await db.Vendedores.findByPk(vendedorId)
    
  const PDV = await db.PuntosDeVenta.findByPk(vendedor.puntoDeVentaId)

    const sucursal = await db.Sucursales.findByPk(PDV.sucursalId)

  const stocks = await db.Stocks.findAll({
    where: {
      // Aquí defines tu condición
      sucursalId: sucursal.id
    }
  });


    
   
  let mensajeError = null;
  
  let banderaStock = 0

  let lineaDeArticulodb
 
  
    //iterar sobre los stocks 
    for (const stock of stocks) {
     
      if (stock.talleId ==talleId && stock.colorId ==colorId  && stock.articuloId ==articuloId ) {
         
        banderaStock = 1

    
      const articulodb = await db.Articulos.findByPk(articuloId)

      var lineaDeArticulo = new LineaDeArticulo({cantidad: 1, articulo: articulodb})

      let subTotal =  lineaDeArticulo.calcularSubTotal()

      lineaDeArticulodb = await db.lineasDeArticulos.create({cantidad: 1, talleId: talleId, colorId: colorId, articuloId: articuloId, 
        subTotal: subTotal, tipo: "DEVOLUCION", devolucionId: devolucionId})

       
  break;  // Salir del bucle ya que la línea fue agregada

}
} 


if(banderaStock === 0){
  mensajeError = 'No existe stock para el color y talle introducidos.';
  
}

  
  if (mensajeError) {
    return res.status(404).json(makeErrorResponse([mensajeError]));
  }

 
 // apicache.clear();

  
  res.json(makeSuccessResponse(lineaDeArticulodb));

   
  } catch (error) {
   
    res.status(400).json({ error: error.message });
  }

}








const agregarLineaCambio = async (req, res, next) => {
    
  const { talleId, colorId, articuloId, devolucionId } = req.body
 

  try {
       
     
    const devolucion = await db.Devoluciones.findByPk(devolucionId)
    

    // Verificar si la Devolucion existe
    if (!devolucion) {
        return res.status(404).json(makeErrorResponse(['No se encontró una Devolucion para el id introducido.']));
    }

    if (devolucion.estado == "FINALIZADA") {
      return res.status(404).json(makeErrorResponse(['La Devolucion ya se encuentra finalizada, no se puede introducir una linea de Devolucion.']));
  }
    
  
  let vendedorId = req.user.vendedorId

  const vendedor = await db.Vendedores.findByPk(vendedorId)
    
  const PDV = await db.PuntosDeVenta.findByPk(vendedor.puntoDeVentaId)

    const sucursal = await db.Sucursales.findByPk(PDV.sucursalId)

  const stocks = await db.Stocks.findAll({
    where: {
      // Aquí defines tu condición
      sucursalId: sucursal.id
    }
  });

  const lineadb  = await db.lineasDeArticulos.findOne({
    where: {
      devolucionId: devolucionId
    }
  });

  const articulodb = await db.Articulos.findByPk(articuloId)
    
   
    let mensajeError = null;
    
    let banderaStock = 0

    let lineaDeArticulodb
   
    
      //iterar sobre los stocks 
      for (const stock of stocks) {
       
        if (stock.talleId ==talleId && stock.colorId ==colorId  && stock.articuloId ==articuloId ) {
           
          banderaStock = 1

          
        if (stock.cantidad >= 1) {

         
        if(articulodb.precio_venta <= lineadb.subTotal){

        var lineaDeArticulo = new LineaDeArticulo({cantidad: 1, articulo: articulodb})

        let subTotal =  lineaDeArticulo.calcularSubTotal()

        lineaDeArticulodb = await db.lineasDeArticulos.create({cantidad: 1, talleId: talleId, colorId: colorId, articuloId: articuloId, 
          subTotal: subTotal, tipo: "CAMBIO", devolucionId: devolucionId})
        }else{
          mensajeError = 'El precio del articulo de cambio debe ser mayor o igual que el articulo devuelto.';
        }
         
    break;  // Salir del bucle ya que la línea fue agregada
  } else {
      mensajeError = 'No hay stock suficiente para la cantidad introducida.';
  }
} 



  }


  
  if(banderaStock === 0){
    mensajeError = 'No existe stock para el color y talle introducidos.';
    
  }
  
    


    if (mensajeError) {
      return res.status(404).json(makeErrorResponse([mensajeError]));
    }

   
   // apicache.clear();

  
    
    res.json(makeSuccessResponse(lineaDeArticulodb));

   
  
   
  } catch (error) {
   
    res.status(400).json({ error: error.message });
  }


}



//GET http://localhost:8080/lineaDeVentas
const getAlllineaDeArticulo = async (req, res, next) => {
   try{
    const lineasDeArticulodb = await db.lineasDeArticulos.findAll()
    
    res.json(makeSuccessResponse(lineasDeArticulodb))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/lineaDeVentas/id
const getlineaDeArticuloById = async (req, res, next) => {
   
    try{
        const lineaDeArticuloId = req.params.id

        const lineaDeArticulo = await db.lineasDeArticulos.findByPk(lineaDeArticuloId)

    if(!lineaDeArticulo){

    
    return res.status(404).json(makeErrorResponse([`lineaDeVenta con id ${lineaDeArticuloId} no encontrada.`]))
   }
   
    
   res.json(makeSuccessResponse(lineaDeArticulo))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/lineaDeVentas/id
const deletelineaDeVentaById = async (req, res, next) => {
    try {
      const { lineaDeArticuloId,ventaId } = req.body
  
      // Verifica si la lineaDeVenta existe
      const lineaDeArticulo = await db.lineasDeArticulos.findByPk(lineaDeArticuloId)

    if(!lineaDeArticulo){

    
    return res.status(404).json(makeErrorResponse([`lineaDeArticulo con id ${lineaDeArticuloId} no encontrada.`]))
   }


      const venta = await db.Ventas.findByPk(ventaId)
          
          // Verificar si la venta existe
          if (!venta) {
              return res.status(404).json(makeErrorResponse(['No se encontró una venta para el id introducido.']));
          }
      
          if (venta.estado == "FINALIZADA") {
            return res.status(404).json(makeErrorResponse(['La venta ya se encuentra finalizada, no se puede eliminar su linea de venta.']));
        }

       // await venta.eliminarLineaDeVenta(lineaDeVentaExistente)

      // Elimina la lineaDeVenta de la base de datos
      await db.lineasDeArticulos.destroy({
        where: {
          id: lineaDeArticuloId
        }
      });

  
      //removingLogger.info(lineaDeVentaExistente)
      //apicache.clear()
      return res.status(200).json(makeSuccessResponse(['linea de articulo eliminada correctamente']))

      //res.json(lineaDeVentaExistente)
    } catch (err) {
      console.error(err);
      next(err)
    }
  }







  const deletelineaDeDevolucionById = async (req, res, next) => {
    try {
      const { lineaDeArticuloId,devolucionId } = req.body
  
      // Verifica si la lineaDeVenta existe
      const lineaDeArticulo = await db.lineasDeArticulos.findByPk(lineaDeArticuloId)

    if(!lineaDeArticulo){

    
    return res.status(404).json(makeErrorResponse([`lineaDeArticulo con id ${lineaDeArticuloId} no encontrada.`]))
   }


      const devolucion = await db.Devoluciones.findByPk(devolucionId)
          
          // Verificar si la venta existe
          if (!devolucion) {
              return res.status(404).json(makeErrorResponse(['No se encontró una devolucion para el id introducido.']));
          }
      
          if (devolucion.estado == "FINALIZADA") {
            return res.status(404).json(makeErrorResponse(['La devolucion ya se encuentra finalizada, no se puede eliminar su linea de venta.']));
        }

      

      // Elimina la lineaDeVenta de la base de datos
      await db.lineasDeArticulos.destroy({
        where: {
          id: lineaDeArticuloId
        }
      });

      //removingLogger.info(lineaDeVentaExistente)
      //apicache.clear()
      return res.status(200).json(makeSuccessResponse(['linea de articulo eliminada correctamente']))

      //res.json(lineaDeVentaExistente)
    } catch (err) {
      console.error(err);
      next(err)
    }
  }
  

      const deletelineaDeCambioById = async (req, res, next) => {
        try {
          const { lineaDeArticuloId,devolucionId } = req.body
      
          // Verifica si la lineaDeVenta existe
          const lineaDeArticulo = await db.lineasDeArticulos.findByPk(lineaDeArticuloId)
    
        if(!lineaDeArticulo){
    
        
        return res.status(404).json(makeErrorResponse([`lineaDeArticulo con id ${lineaDeArticuloId} no encontrada.`]))
       }
    
    
          const devolucion = await db.Devoluciones.findByPk(devolucionId)
              
              // Verificar si la venta existe
              if (!devolucion) {
                  return res.status(404).json(makeErrorResponse(['No se encontró una devolucion para el id introducido.']));
              }
          
              if (devolucion.estado == "FINALIZADA") {
                return res.status(404).json(makeErrorResponse(['La devolucion ya se encuentra finalizada, no se puede eliminar su linea de venta.']));
            }
    
          
    
          // Elimina la lineaDeVenta de la base de datos
          await db.lineasDeArticulos.destroy({
            where: {
              id: lineaDeArticuloId
            }
          });

  
      //removingLogger.info(lineaDeVentaExistente)
      //apicache.clear()
      return res.status(200).json(makeSuccessResponse(['linea de articulo eliminada correctamente']))

      //res.json(lineaDeVentaExistente)
    } catch (err) {
      console.error(err);
      next(err)
    }
  }


//PATCH http://localhost:3000/api/lineaDeVentas/id
  const patchlineaDeArticuloById = async (req, res, next) => {
    try{
    
      const { lineaDeArticuloId, ventaId, cantidad} = req.body

    // Encuentra el índice del autor con el ID especificado
    const lineaDeArticulodb = await db.lineasDeArticulos.findByPk(lineaDeArticuloId)
    if (!lineaDeArticulo) {
        return res.status(404).json(makeErrorResponse([`linea de articulo con id ${lineaDeArticuloId} no encontrada.`]))
      }

     
      const venta = await db.Ventas.findByPk(ventaId)
          
          // Verificar si la venta existe
          if (!venta) {
              return res.status(404).json(makeErrorResponse(['No se encontró una venta para el id introducido.']));
          }
      
          if (venta.estado == "FINALIZADA") {
            return res.status(404).json(makeErrorResponse(['La venta ya se encuentra finalizada, no se puede eliminar su linea de venta.']));
        }

        const articulodb = await db.Articulos.findByPk(lineaDeArticulodb.articuloId)

        lineaDeArticulo = new LineaDeArticulo({cantidad: cantidad, articulo: articulodb})

        lineaDeArticulo.calcularSubTotal()

        await lineaDeArticulodb.update({ cantidad: cantidad, subTotal: lineaDeArticulo.subTotal});

   

      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['lineaDeVenta actualizada correctamente']))

       
    } catch (err) {
      next(err)
    }
}


module.exports = {
  getAlllineaDeArticulo,
  agregarlineaDeVenta,
    getlineaDeArticuloById,
    patchlineaDeArticuloById,
    deletelineaDeVentaById,
    deletelineaDeDevolucionById,
    deletelineaDeCambioById,

    agregarLineaCambio,
    agregarLineaDevolucion
}