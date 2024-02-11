const talleRouter = require('express').Router()
const { getAllTalles, createTalle, getTalleById, patchTalleById, deleteTalleById } = require('../controllers/talle.controller')
const { isAdministrador, isAuthenthicated } = require('../middlewares/auth.middlewares')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
const {  validateTalleData } = require('../middlewares/talle.middleware')
const apicache = require('apicache')



let cache = apicache.middleware

talleRouter.post('/',isAdministrador,

createTalle,
errorMiddleware
)




talleRouter.get('/', isAuthenthicated,
cache('5 minutes'),
getAllTalles,
errorMiddleware
)



talleRouter.get('/:id', isAuthenthicated,

getTalleById,
errorMiddleware
)



talleRouter.delete('/:id', isAdministrador,

deleteTalleById,
errorMiddleware
 )



 talleRouter.patch('/:id', isAdministrador,
 
 patchTalleById,
 errorMiddleware
  )



module.exports = talleRouter