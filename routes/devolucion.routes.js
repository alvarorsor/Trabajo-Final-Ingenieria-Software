const devolucionRouter = require('express').Router()
const { getAllDevolucions,  createDevolucion, getDevolucionById, patchDevolucionById, deleteDevolucionById,finalizarDevolucion,ingresarCliente } = require('../controllers/devolucion.controller')
const { isVendedor, isAuthenthicated } = require('../middlewares/auth.middlewares')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
const {   validateDevolucionDataCliente, validateDevolucionDataFinalizar } = require('../middlewares/devolucion.middleware')
const apicache = require('apicache')



let cache = apicache.middleware

devolucionRouter.post('/crear-devolucion',isVendedor,

createDevolucion,
  //errorMiddleware
);

devolucionRouter.post('/ingresar-cliente',isVendedor,

ingresarCliente,
  //errorMiddleware
);



devolucionRouter.post('/finalizar-devolucion',isVendedor,

finalizarDevolucion,
  //errorMiddleware
);

devolucionRouter.get('/',isAuthenthicated, 
cache('5 minutes'),
getAllDevolucions,
errorMiddleware
)



devolucionRouter.get('/:id',isAuthenthicated, 

getDevolucionById,
errorMiddleware
)




devolucionRouter.delete('/:id', 

deleteDevolucionById,
errorMiddleware
 )



 devolucionRouter.patch('/:id', 

 patchDevolucionById,
 errorMiddleware
  )



module.exports = devolucionRouter