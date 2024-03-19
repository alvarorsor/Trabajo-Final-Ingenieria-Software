const ventaRouter = require('express').Router()
const { getAllVentas,  createVenta, getVentaById, patchVentaById, deleteVentaById,finalizarVenta,ingresarCliente, realizarVenta } = require('../controllers/venta.controller')
const { isVendedor, isAuthenthicated, isAdministrador } = require('../middlewares/auth.middlewares')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
const {  validateVentaDataIntroducirArticulo, validateVentaDataCliente, validateVentaDataFinalizar } = require('../middlewares/venta.middleware')
const apicache = require('apicache')



let cache = apicache.middleware

ventaRouter.post('/crear-venta', isVendedor,
  realizarVenta,
  errorMiddleware
);

ventaRouter.post('/ingresar-cliente', isVendedor,

  ingresarCliente,
  errorMiddleware
);



ventaRouter.post('/finalizar-venta',isVendedor,

finalizarVenta,
  errorMiddleware
);

ventaRouter.get('/',isAuthenthicated, 
cache('5 minutes'),
getAllVentas,
errorMiddleware
)



ventaRouter.get('/:id', isAuthenthicated,

getVentaById,
errorMiddleware
)




ventaRouter.delete('/:id', isAdministrador,

deleteVentaById,
errorMiddleware
 )



 ventaRouter.patch('/:id', isAuthenthicated,
 
 patchVentaById,
 errorMiddleware
  )



module.exports = ventaRouter