const clienteRouter = require('express').Router()
const { getAllClientes, createCliente, getClienteById, patchClienteById, deleteClienteById, getClienteByCUIT } = require('../controllers/cliente.controller')
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware')
const {  validateClienteData } = require('../middlewares/cliente.middleware')
const apicache = require('apicache')
const { isAdministrador, isAuthenthicated } = require('../middlewares/auth.middlewares')



let cache = apicache.middleware

clienteRouter.post('/',isAdministrador,

createCliente,
errorMiddleware
)




// clienteRouter.get('/',isAuthenthicated,
// cache('5 minutes'),
// getAllClientes,
// errorMiddleware
// )



clienteRouter.get('/:id',isAuthenthicated, 

getClienteById,
errorMiddleware
)



clienteRouter.delete('/:id',isAdministrador, 

deleteClienteById,
errorMiddleware
 )



 clienteRouter.patch('/:id',isAdministrador, 
 
 patchClienteById,
 errorMiddleware
  )

clienteRouter.get('/',
    isAuthenthicated,
    getClienteByCUIT,
    errorMiddleware
)


module.exports = clienteRouter