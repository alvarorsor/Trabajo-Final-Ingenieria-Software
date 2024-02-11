const db = require('../repositorio/models')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')



//POST http://localhost:3000/api/createCliente/
const createCliente = async (req, res, next) => {
    try {
       
        // Crear Cliente
        const { nombre, apellido, domicilio, CUIT, condicionTributariaId } = req.body

        const clientedb = await db.Clientes.create({nombre: nombre, apellido: apellido, domicilio: domicilio, CUIT: CUIT, condicionTributariaId: condicionTributariaId})
    
        apicache.clear()
        res.json(makeSuccessResponse(clientedb))
      } catch (err) {
        next(err)
      }
    
}


//GET http://localhost:8080/Clientes
const getAllClientes = async (req, res, next) => {
   try{
    const clientedb = await db.Clientes.findAll()
    
    res.json(makeSuccessResponse(clientedb))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/Clientes/id
const getClienteById = async (req, res, next) => {
   
    try{
        const ClienteId = req.params.id

        const cliente = await db.Clientes.findByPk(ClienteId)

    if(!cliente){

    
    return res.status(404).json(makeErrorResponse([`Cliente con id ${ClienteId} no encontrado.`]))
   }
   
    
   res.json(makeSuccessResponse(cliente))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/Clientes/id
const deleteClienteById = async (req, res, next) => {
    try {
      const ClienteId = req.params.id
  
      // Verifica si la Cliente existe
      const cliente = await db.Clientes.findByPk(ClienteId)
      if (!cliente) {
        return res.status(404).json(makeErrorResponse([`Cliente con id ${ClienteId} no encontrado.`]))
      }
      // Elimina la Cliente de la base de datos
      await db.Clientes.destroy({
        where: {
          id: ClienteId
        }
      });
  
  
     
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Cliente eliminado correctamente']))

      //res.json(ClienteExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:3000/api/Clientes/id
  const patchClienteById = async (req, res, next) => {
    try{
    
    const ClienteId = req.params.id
    // Encuentra el índice del autor con el ID especificado
    const cliente = await db.Clientes.findByPk(ClienteId)
    if (!cliente) {
        return res.status(404).json(makeErrorResponse([`Cliente con id ${ClienteId} no encontrado.`]))
      }
     
      await db.Colores.update(
        {
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          domicilio: req.body.domicilio,
          CUIT: req.body.CUIT,
          condicionTributariaId: req.body.condicionTributariaId
         
        },
        
        {
          where: {
            id: ClienteId
          },
          
        }
      );
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Cliente actualizado correctamente']))

       
    } catch (err) {
      next(err)
    }
}


module.exports = {
    getAllClientes,
    createCliente,
    getClienteById,
    patchClienteById,
    deleteClienteById
}