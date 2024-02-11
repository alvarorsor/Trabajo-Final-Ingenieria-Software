const marcaRouter = require('express').Router()
const { getAllMarcas, createMarca, getMarcaById, patchMarcaById, deleteMarcaById } = require('../controllers/marca.controller')
const { isAdministrador, isAuthenthicated } = require('../middlewares/auth.middlewares')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
const {  validateMarcaData } = require('../middlewares/marca.middleware')
const apicache = require('apicache')



let cache = apicache.middleware

marcaRouter.post('/', isAdministrador,
validateMarcaData,
createMarca,
errorMiddleware
)




marcaRouter.get('/',isAuthenthicated ,
cache('5 minutes'),
getAllMarcas,
errorMiddleware
)



marcaRouter.get('/:id', isAuthenthicated,

getMarcaById,
errorMiddleware
)



marcaRouter.delete('/:id', isAdministrador,

deleteMarcaById,
errorMiddleware
 )



 marcaRouter.patch('/:id', isAdministrador,

 patchMarcaById,
 errorMiddleware
  )



module.exports = marcaRouter