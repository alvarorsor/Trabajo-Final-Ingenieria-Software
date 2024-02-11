const condicionTributariaRouter = require('express').Router()
const { getAllCondicionesTributarias, createCondicionTributaria, getCondicionTributariaById, patchCondicionTributariaById, deleteCondicionTributariaById } = require('../controllers/condicionTributaria.controller')
const apicache = require('apicache')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
const { isAdministrador, isAuthenthicated } = require('../middlewares/auth.middlewares')


let cache = apicache.middleware

condicionTributariaRouter.post('/',isAdministrador,

createCondicionTributaria,
errorMiddleware
)




condicionTributariaRouter.get('/',isAuthenthicated, 
cache('5 minutes'),
getAllCondicionesTributarias,
errorMiddleware
)



condicionTributariaRouter.get('/:id',isAuthenthicated, 

getCondicionTributariaById,
errorMiddleware
)



condicionTributariaRouter.delete('/:id',isAdministrador, 

deleteCondicionTributariaById,
errorMiddleware
 )



 condicionTributariaRouter.patch('/:id',isAdministrador, 
 
 patchCondicionTributariaById,
 errorMiddleware
  )



module.exports = condicionTributariaRouter