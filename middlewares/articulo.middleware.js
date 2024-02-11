const { param, body } = require('express-validator')
const { requestValidation } = require('./common.middleware')



const validateArticuloData = [
    body('descripcion').notEmpty().withMessage('descripcion es requerido'),
    body('descripcion').isString().withMessage('descripcion debe ser string'),
    body('codigo').notEmpty().withMessage('codigo es requerido'),
    body('codigo').isNumeric().withMessage('codigo debe ser numerico'),
    body('costo').notEmpty().withMessage('costo es requerido'),
    body('costo').isNumeric().withMessage('costo debe ser numerico'),
    body('margen_ganancia').notEmpty().withMessage('margen_ganancia es requerido'),
    body('margen_ganancia').isNumeric().withMessage('margen_ganancia debe ser numerico'),
  
    requestValidation,
]

module.exports = {
    
    validateArticuloData
}