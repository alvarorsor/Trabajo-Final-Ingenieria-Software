const stockRouter = require('express').Router()
const { getAllStocks, createStock, getStockById, patchStockById, deleteStockById } = require('../controllers/stock.controller')
const { isAdministrador, isAuthenthicated } = require('../middlewares/auth.middlewares')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
const {  validateStockData } = require('../middlewares/stock.middleware')
const apicache = require('apicache')



let cache = apicache.middleware

stockRouter.post('/', isAdministrador,

createStock,
errorMiddleware
)




stockRouter.get('/',  isAuthenthicated,
cache('5 minutes'),
getAllStocks,
errorMiddleware
)



stockRouter.get('/:id', isAuthenthicated, 

getStockById,
errorMiddleware
)



stockRouter.delete('/:id', isAdministrador,

deleteStockById,
errorMiddleware
 )



 stockRouter.patch('/:id', isAdministrador,
 
 patchStockById,
 errorMiddleware
  )



module.exports = stockRouter