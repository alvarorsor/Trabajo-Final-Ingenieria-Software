const PDVRouter = require('express').Router()
const { getAllPDVs, createPDV, getPDVById, patchPDVById, deletePDVById } = require('../controllers/PDV.controller')
const { isAdministrador, isAuthenthicated } = require('../middlewares/auth.middlewares')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
//const {  validatePDVData } = require('../middlewares/PDV.middleware')
const apicache = require('apicache')



let cache = apicache.middleware

PDVRouter.post('/',//isAdministrador,

createPDV,
errorMiddleware
)




PDVRouter.get('/', //isAuthenthicated,
cache('5 minutes'),
getAllPDVs,
errorMiddleware
)



PDVRouter.get('/:id', //isAuthenthicated,

getPDVById,
errorMiddleware
)



PDVRouter.delete('/:id', //isAdministrador,

deletePDVById,
errorMiddleware
 )



 PDVRouter.patch('/:id', //isAdministrador,
 
 patchPDVById,
 errorMiddleware
  )



module.exports = PDVRouter