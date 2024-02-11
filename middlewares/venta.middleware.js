const { param, body } = require('express-validator')
const { requestValidation } = require('./common.middleware')



const validateVentaDataCliente = [
   
    
    body('clienteId').isMongoId().withMessage('clienteId debe ser de tipo Mongo ID'),
   
  
    requestValidation,
]

const validateVentaDataIntroducirArticulo = [
   
    
   
    body('ventaId').isMongoId().withMessage('ventaId debe ser de tipo Mongo ID'),
    body('cantidad').isNumeric().withMessage('cantidad debe ser de tipo numerico'),
  
    requestValidation,
]

const validateVentaDataFinalizar = [
   
    
   
    body('ventaId').isMongoId().withMessage('ventaId debe ser de tipo Mongo ID'),
    body('tipoPago').isString().withMessage('tipo de pago debe ser de tipo string'),
  
    requestValidation,
]


module.exports = {
    
    validateVentaDataIntroducirArticulo, validateVentaDataCliente, validateVentaDataFinalizar
}



