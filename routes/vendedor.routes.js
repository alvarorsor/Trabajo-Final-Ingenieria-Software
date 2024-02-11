const vendedorRouter = require('express').Router()
const { getAllVendedors,  createVendedor, getVendedorById, patchVendedorById, deleteVendedorById } = require('../controllers/vendedor.controller')
const { isVendedor, isAuthenthicated, isAdministrador } = require('../middlewares/auth.middlewares')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
//const {  validatevendedorDataIntroducirArticulo, validatevendedorDataCliente, validatevendedorDataFinalizar } = require('../middlewares/vendedor.middleware')
const apicache = require('apicache')



let cache = apicache.middleware

vendedorRouter.post('/', //isAdministrador,

createVendedor,
  errorMiddleware
);



vendedorRouter.get('/',//isAuthenthicated, 
cache('5 minutes'),
getAllVendedors,
errorMiddleware
)



vendedorRouter.get('/:id', //isAuthenthicated,

getVendedorById,
errorMiddleware
)




vendedorRouter.delete('/:id', //isAdministrador,

deleteVendedorById,
errorMiddleware
 )



 vendedorRouter.patch('/:id', //isAdministrador,
 
 patchVendedorById,
 errorMiddleware
  )



module.exports = vendedorRouter