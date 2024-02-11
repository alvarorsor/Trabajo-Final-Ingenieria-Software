const tipoTalleRouter = require('express').Router()
const { getAlltipoTalles, createtipoTalle, gettipoTalleById, patchtipoTalleById, deletetipoTalleById } = require('../controllers/tipoTalle.controller')
const { isAdministrador, isAuthenthicated } = require('../middlewares/auth.middlewares')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
const {  validatetipoTalleData } = require('../middlewares/tipoTalle.middleware')
const apicache = require('apicache')



let cache = apicache.middleware

tipoTalleRouter.post('/',isAdministrador,

createtipoTalle,
errorMiddleware
)




tipoTalleRouter.get('/', isAuthenthicated,
cache('5 minutes'),
getAlltipoTalles,
errorMiddleware
)



tipoTalleRouter.get('/:id', isAuthenthicated,

gettipoTalleById,
errorMiddleware
)



tipoTalleRouter.delete('/:id', isAdministrador,

deletetipoTalleById,
errorMiddleware
 )



 tipoTalleRouter.patch('/:id', isAdministrador,
 
 patchtipoTalleById,
 errorMiddleware
  )



module.exports = tipoTalleRouter