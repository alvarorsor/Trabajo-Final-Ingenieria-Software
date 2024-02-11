const lineaDeArticuloRouter = require('express').Router()
const { getAlllineaDeArticulo, agregarlineaDeVenta, getlineaDeArticuloById, patchlineaDeArticuloById,
   deletelineaDeVentaById,deletelineaDeCambioById,deletelineaDeDevolucionById, agregarLineaCambio, agregarLineaDevolucion } = require('../controllers/lineaDeArticulo.controller')
const { isVendedor, isAdministrador, isAuthenthicated } = require('../middlewares/auth.middlewares')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
const {  validatelineaDeVentaData,  } = require('../middlewares/lineaDeVenta.middleware')
const apicache = require('apicache')



let cache = apicache.middleware

lineaDeArticuloRouter.post('/agregar-linea-venta',isVendedor,

agregarlineaDeVenta,
errorMiddleware
)

lineaDeArticuloRouter.post('/agregar-devolucion',isVendedor,

agregarLineaDevolucion,
errorMiddleware
)

lineaDeArticuloRouter.post('/agregar-cambio',isVendedor,

agregarLineaCambio,
errorMiddleware
)


lineaDeArticuloRouter.get('/', isAuthenthicated, 
cache('5 minutes'),
getAlllineaDeArticulo,
errorMiddleware
)



lineaDeArticuloRouter.get('/:id', isAuthenthicated,

getlineaDeArticuloById,
errorMiddleware
)



lineaDeArticuloRouter.delete('/eliminar-linea-venta', isVendedor,

deletelineaDeVentaById,
errorMiddleware
 )

 lineaDeArticuloRouter.delete('/eliminar-linea-devolucion', isVendedor,

 deletelineaDeDevolucionById,
errorMiddleware
 )

 lineaDeArticuloRouter.delete('/eliminar-linea-cambio', isVendedor,

 deletelineaDeCambioById,
errorMiddleware
 )



 lineaDeArticuloRouter.patch('/', isVendedor,
 //validateMongoId,
 patchlineaDeArticuloById,
 errorMiddleware
  )



module.exports = lineaDeArticuloRouter