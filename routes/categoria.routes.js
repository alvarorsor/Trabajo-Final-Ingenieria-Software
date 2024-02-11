const categoriaRouter = require('express').Router()
const { getAllCategorias, createCategoria, getCategoriaById, patchCategoriaById, deleteCategoriaById } = require('../controllers/categoria.controller')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
const {  validateCategoriaData } = require('../middlewares/categoria.middleware')
const apicache = require('apicache')
const { isAdministrador, isAuthenthicated } = require('../middlewares/auth.middlewares')



let cache = apicache.middleware

categoriaRouter.post('/',isAdministrador,
validateCategoriaData,
createCategoria,
errorMiddleware
)




categoriaRouter.get('/',isAuthenthicated, 
cache('5 minutes'),
getAllCategorias,
errorMiddleware
)



categoriaRouter.get('/:id',isAuthenthicated, 

getCategoriaById,
errorMiddleware
)



categoriaRouter.delete('/:id',isAdministrador, 

deleteCategoriaById,
errorMiddleware
 )



 categoriaRouter.patch('/:id',isAdministrador, 
 
 patchCategoriaById,
 errorMiddleware
  )



module.exports = categoriaRouter