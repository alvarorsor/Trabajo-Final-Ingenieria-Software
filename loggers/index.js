/*const winston = require('winston')
const IncidentTransport = require('./transport/IncidentTransport')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
        new winston.transports.File({ filename: 'error.log', level:'error'}),
        new IncidentTransport({ level: 'error' }),
        new winston.transports.Console()

    ]
})


const removingLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
        new winston.transports.File({filename: 'remove-entities-log', level:'info'}),
    ]
})


module.exports = {
    logger,
    removingLogger
}
*/