const colorRouter = require('express').Router()
const { getAllColors, createColor, getColorById, patchColorById, deleteColorById } = require('../controllers/color.controller')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
const {  validateColorData } = require('../middlewares/color.middleware')
const apicache = require('apicache')
const { isAdministrador, isAuthenthicated } = require('../middlewares/auth.middlewares')



let cache = apicache.middleware

colorRouter.post('/',isAdministrador,
validateColorData,
createColor,
errorMiddleware
)




colorRouter.get('/',isAuthenthicated, 
cache('5 minutes'),
getAllColors,
errorMiddleware
)



colorRouter.get('/:id',isAuthenthicated, 
validateMongoId,
getColorById,
errorMiddleware
)



colorRouter.delete('/:id',isAdministrador, 
validateMongoId,
deleteColorById,
errorMiddleware
 )



 colorRouter.patch('/:id',isAdministrador, 
 validateMongoId,
 patchColorById,
 errorMiddleware
  )



module.exports = colorRouter