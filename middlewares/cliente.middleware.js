const { param, body } = require('express-validator')
const { requestValidation } = require('./common.middleware')



const validateClienteData = [
    body('nombre').notEmpty().withMessage('nombre es requerido'),
    body('nombre').isString().withMessage('nombre debe ser string'),
    body('apellido').notEmpty().withMessage('apellido es requerido'),
    body('apellido').isString().withMessage('apellido debe ser string'),
    body('telefono').notEmpty().withMessage('telefono es requerido'),
    body('telefono').isNumeric().withMessage('telefono debe ser numerico'),
    body('direccion').notEmpty().withMessage('direccion es requerido'),
    body('direccion').isString().withMessage('direccion debe ser string'),
   
  
    requestValidation,
]

module.exports = {
    
    validateClienteData
}