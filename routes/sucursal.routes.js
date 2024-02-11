const sucursalRouter = require('express').Router()
const { getAllSucursals, createSucursal, getSucursalById, patchSucursalById, deleteSucursalById } = require('../controllers/sucursal.controller')
const { isAdministrador, isAuthenthicated } = require('../middlewares/auth.middlewares')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
//const {  validatesucursalData } = require('../middlewares/sucursal.middleware')
const apicache = require('apicache')



let cache = apicache.middleware

sucursalRouter.post('/',//isAdministrador,

createSucursal,
//errorMiddleware
)




sucursalRouter.get('/', //isAuthenthicated,
cache('5 minutes'),
getAllSucursals,
errorMiddleware
)



sucursalRouter.get('/:id', //isAuthenthicated,

getSucursalById,
errorMiddleware
)



sucursalRouter.delete('/:id',// isAdministrador,

deleteSucursalById,
errorMiddleware
 )



 sucursalRouter.patch('/:id', //isAdministrador,
 
 patchSucursalById,
 errorMiddleware
  )



module.exports = sucursalRouter