const { param, body } = require('express-validator')
const { requestValidation } = require('./common.middleware')



const validateStockData = [
    body('cantidad').notEmpty().withMessage('cantidad es requerida'),
    body('cantidad').isNumeric().withMessage('cantidad debe ser numerica'),
   
  
    requestValidation,
]

module.exports = {
    
    validateStockData
}