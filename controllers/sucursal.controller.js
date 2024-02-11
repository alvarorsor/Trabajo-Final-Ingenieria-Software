
const db = require('../repositorio/models')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')



//POST http://localhost:3000/api/createSucursal/
const createSucursal = async (req, res, next) => {
    try {
       
      const { direccion } = req.body

    

       const sucursaldb = await db.Sucursales.create({direccion:direccion})
        
        
    
        apicache.clear()

        res.json(makeSuccessResponse(sucursaldb))
      } catch (err) {
        next(err)
      }
    
}


//GET http://localhost:8080/Sucursals
const getAllSucursals = async (req, res, next) => {
   try{
    const sucursales = await db.Sucursales.findAll()
    
    res.json(makeSuccessResponse(sucursales))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/Sucursals/id
const getSucursalById = async (req, res, next) => {
   
    try{
        const SucursalId = req.params.id

        const Sucursal = await db.Sucursales.findByPk(SucursalId)

    if(!Sucursal){

    
    return res.status(404).json(makeErrorResponse([`Sucursal con id ${SucursalId} no encontrada.`]))
   }
   
    
   res.json(makeSuccessResponse(Sucursal))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/Sucursals/id
const deleteSucursalById = async (req, res, next) => {
    try {
      const SucursalId = req.params.id
  
      // Verifica si la Sucursal existe
      const Sucursal = await db.Sucursales.findByPk(SucursalId)
      if (!Sucursal) {
        return res.status(404).json(makeErrorResponse([`Sucursal con id ${SucursalId} no encontrada.`]))
      }
      // Elimina la Sucursal de la base de datos
      await db.Sucursales.destroy({
        where: {
          id: SucursalId
        }
      });
  
     
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Sucursal eliminada correctamente']))

      //res.json(SucursalExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:3000/api/Sucursals/id
  const patchSucursalById = async (req, res, next) => {
    try{
    
    const SucursalId = req.params.id
    
    const Sucursal = await db.Sucursales.findByPk(SucursalId)
    if (!Sucursal) {
        return res.status(404).json(makeErrorResponse([`Sucursal con id ${SucursalId} no encontrada.`]))
      }
     
      await db.Sucursales.update(
        {
            direccion: req.body.direccion,
         
        },
        
        {
          where: {
            id: SucursalId
          },
          
        }
      );

      
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Sucursal actualizada correctamente']))

       
    } catch (err) {
      next(err)
    }
}


module.exports = {
    getAllSucursals,
    createSucursal,
    getSucursalById,
    patchSucursalById,
    deleteSucursalById
}