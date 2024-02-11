const { param, body } = require('express-validator')
const { requestValidation } = require('./common.middleware')



const validatelineaDeVentaData = [
    body('cantidad').notEmpty().withMessage('cantidad es requerido'),
    body('cantidad').isNumeric().withMessage('cantidad debe ser numerico'),
    body('articuloId').notEmpty().withMessage('articuloId es requerido'),
    body('articuloId').isMongoId().withMessage('articuloId debe ser de tipo Mongo ID'),
    body('colorId').notEmpty().withMessage('colorId es requerido'),
    body('colorId').isMongoId().withMessage('colorId debe ser de tipo Mongo ID'),
    body('talleId').notEmpty().withMessage('talleId es requerido'),
    body('talleId').isMongoId().withMessage('talleId debe ser de tipo Mongo ID'),
  
    requestValidation,
]

module.exports = {
    
    validatelineaDeVentaData
}