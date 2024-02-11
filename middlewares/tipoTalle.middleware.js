const { param, body } = require('express-validator')
const { requestValidation } = require('./common.middleware')



const validatetipoTalleData = [
    body('descripcion').notEmpty().withMessage('descripción es requerido'),
    body('descripcion').isString().withMessage('descripción debe ser string'),
   
  
    requestValidation,
]

module.exports = {
    
    validatetipoTalleData
}