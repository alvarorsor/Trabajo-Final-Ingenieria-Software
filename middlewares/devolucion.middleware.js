const { param, body } = require('express-validator')
const { requestValidation } = require('./common.middleware')



const validateDevolucionDataCliente = [
   
    
    body('clienteId').isMongoId().withMessage('clienteId debe ser de tipo Mongo ID'),
   
  
    requestValidation,
]

const validateDevolucionDataIntroducirArticulo = [
   
    
   
    body('devolucionId').isMongoId().withMessage('DevolucionId debe ser de tipo Mongo ID'),
    
  
    requestValidation,
]

const validateDevolucionDataFinalizar = [
   
    
   
    body('devolucionId').isMongoId().withMessage('DevolucionId debe ser de tipo Mongo ID'),
    body('tipoPago').isString().withMessage('tipo de pago debe ser de tipo string'),
  
    requestValidation,
]


module.exports = {
    
    validateDevolucionDataIntroducirArticulo, validateDevolucionDataCliente, validateDevolucionDataFinalizar
}



