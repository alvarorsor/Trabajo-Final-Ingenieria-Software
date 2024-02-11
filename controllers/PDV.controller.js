
const db = require('../repositorio/models')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')



//POST http://localhost:3000/api/createPDV/
const createPDV = async (req, res, next) => {
    try {
       
        // Crear PDV
        const { numero, sucursalId } = req.body

       
        
        const pdv = await db.PuntosDeVenta.create({numero:numero,sucursalId:sucursalId})
    
        apicache.clear()
        res.json(makeSuccessResponse(pdv))
      } catch (err) {
        next(err)
      }
    
}


//GET http://localhost:8080/PDVs
const getAllPDVs = async (req, res, next) => {
   try{
    const PDV = await db.PuntosDeVenta.findAll()
    
    res.json(makeSuccessResponse(PDV))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/PDVs/id
const getPDVById = async (req, res, next) => {
   
    try{
        const PDVId = req.params.id

        const PDV = await db.PuntosDeVenta.findByPk(PDVId)

    if(!PDV){

    
    return res.status(404).json(makeErrorResponse([`PDV con id ${PDVId} no encontrado.`]))
   }
   
    
   res.json(makeSuccessResponse(PDV))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/PDVs/id
const deletePDVById = async (req, res, next) => {
    try {
      const PDVId = req.params.id
  
      // Verifica si la PDV existe
      const PDV = await db.PuntosDeVenta.findByPk(PDVId)
      if (!PDV) {
        return res.status(404).json(makeErrorResponse([`PDV con id ${PDVId} no encontrado.`]))
      }


      // Elimina la PDV de la base de datos
      await db.PuntosDeVenta.destroy({
        where: {
          id: PDVId
        }
      });
  
     
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['PDV eliminado correctamente']))

      //res.json(PDVExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:3000/api/PDVs/id
  const patchPDVById = async (req, res, next) => {
    try{
    
    const PDVId = req.params.id
    // Encuentra el índice del autor con el ID especificado
    const PDV = await db.PuntosDeVenta.findByPk(PDVId)
    if (!PDV) {
        return res.status(404).json(makeErrorResponse([`PDV con id ${PDVId} no encontrado.`]))
      }

     
       await db.PuntosDeVenta.update(
        {
          numero: req.body.numero,
         
        },
        
        {
          where: {
            id: PDVId
          },
          
        }
      );
      
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['PDV actualizado correctamente']))

       
    } catch (err) {
      next(err)
    }
}


module.exports = {
    getAllPDVs,
    createPDV,
    getPDVById,
    patchPDVById,
    deletePDVById
}