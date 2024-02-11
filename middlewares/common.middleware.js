const { validationResult, param } = require('express-validator')
const { logger } = require('../loggers')

const requestValidation = (req, res, next) => {
    const result = validationResult(req)

    if (!result.isEmpty()) return res.json({ errors: result.array() })
    
    next()
}

const errorMiddleware = (err, req, res, next) => {
   /* logger.error(err)
    res.status(500)
    res.json({ message: 'Internal server error' })*/
    logger.error(err);
    res.status(500).json({ message: 'Internal server error' });
    next(err);
}

const validateMongoId = [
    param('id').isMongoId().withMessage('Id debe ser de tipo Mongo ID'),
    requestValidation,
]

module.exports = {
    requestValidation,
    errorMiddleware,
    validateMongoId
}