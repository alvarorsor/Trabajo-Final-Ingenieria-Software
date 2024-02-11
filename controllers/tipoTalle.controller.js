
const db = require('../repositorio/models')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')



//POST http://localhost:3000/api/createtipoTalle/
const createtipoTalle = async (req, res, next) => {
    try {
       
        // Crear tipoTalle
        const { descripcion } = req.body

        
       

       
        
        const tipotalledb = await db.tipoTalles.create(descripcion)
    
       

        apicache.clear()
        res.json(makeSuccessResponse(tipotalledb))
      } catch (err) {
        next(err)
      }
    
}


//GET http://localhost:8080/tipoTalles
const getAlltipoTalles = async (req, res, next) => {
   try{
    const tipotalles = await db.tipoTalles.findAll()
    
    res.json(makeSuccessResponse(tipotalles))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/tipoTalles/id
const gettipoTalleById = async (req, res, next) => {
   
    try{
        const tipoTalleId = req.params.id

        const tipotalle = await db.Talles.findByPk(tipoTalleId)


    if(!tipotalle){

    
    return res.status(404).json(makeErrorResponse([`tipoTalle con id ${tipoTalleId} no encontrado.`]))
   }
   
    
   res.json(makeSuccessResponse(tipotalle))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/tipoTalles/id
const deletetipoTalleById = async (req, res, next) => {
    try {
      const tipoTalleId = req.params.id
  
      // Verifica si la tipoTalle existe
      const tipotalle = await db.Talles.findByPk(tipoTalleId)

      if (!tipotalle) {
        return res.status(404).json(makeErrorResponse([`tipoTalle con id ${tipoTalleId} no encontrado.`]))
      }
      // Elimina la tipoTalle de la base de datos
      await db.tipoTalles.destroy({
        where: {
          id: tipoTalleId
        }
      });
  
     
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['tipoTalle eliminado correctamente']))

      //res.json(tipoTalleExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:3000/api/tipoTalles/id
  const patchtipoTalleById = async (req, res, next) => {
    try{
    
    const tipoTalleId = req.params.id

    const tipotalle = await db.Talles.findByPk(tipoTalleId)

    if (!tipotalle) {
        return res.status(404).json(makeErrorResponse([`tipoTalle con id ${tipoTalleId} no encontrado.`]))
      }
     
      await db.tipoTalles.update(
        {
          descripcion: req.body.descripcion,
         
        },
        
        {
          where: {
            id: tipoTalleId
          },
          
        }
      );
       
      
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['tipoTalle actualizado correctamente']))

       
    } catch (err) {
      next(err)
    }
}


module.exports = {
    getAlltipoTalles,
    createtipoTalle,
    gettipoTalleById,
    patchtipoTalleById,
    deletetipoTalleById
}