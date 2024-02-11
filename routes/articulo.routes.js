const articuloRouter = require('express').Router()
const { getAllArticulos, createArticulo, getArticuloByCodigo, patchArticuloById, deleteArticuloById } = require('../controllers/articulo.controller')
const { isAdministrador, isAuthenthicated } = require('../middlewares/auth.middlewares')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
//const {  validateArticuloData } = require('../middlewares/articulo.middleware')

const apicache = require('apicache')



let cache = apicache.middleware

articuloRouter.post('/',isAdministrador, 


createArticulo,
errorMiddleware
)




articuloRouter.get('/',isAuthenthicated, 

cache('5 minutes'),
getAllArticulos,
errorMiddleware
)



articuloRouter.get('/:codigo',isAuthenthicated, 
getArticuloByCodigo,
errorMiddleware
)



articuloRouter.delete('/:id',isAdministrador, 

deleteArticuloById,
errorMiddleware
 )



 articuloRouter.patch('/:id',isAdministrador, 
 
 patchArticuloById,
 errorMiddleware
  )



module.exports = articuloRouter