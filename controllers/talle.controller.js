
const db = require('../repositorio/models')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')
//const { removingLogger } = require('../loggers')


//POST http://localhost:3000/api/createTalle/
const createTalle = async (req, res, next) => {
    try {
       
        // Crear Talle
        const { descripcion, tipoTalleId } = req.body

        
        

        const talledb = await db.Talles.create({descripcion: descripcion, tipoTalleId: tipoTalleId})

       
        apicache.clear()
        res.json(makeSuccessResponse(talledb))
      } catch (err) {
        next(err)
      }
    
}


//GET http://localhost:8080/Talles
const getAllTalles = async (req, res, next) => {
   try{
    const talles = await db.Talles.findAll()
    
    res.json(makeSuccessResponse(talles))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/Talles/id
const getTalleById = async (req, res, next) => {
   
    try{
        const TalleId = req.params.id

        const talle = await db.Talles.findByPk(TalleId)

    if(!talle){

    
    return res.status(404).json(makeErrorResponse([`Talle con id ${TalleId} no encontrado.`]))
   }
   
    
   res.json(makeSuccessResponse(talle))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/Talles/id
const deleteTalleById = async (req, res, next) => {
    try {
      const TalleId = req.params.id
  
      // Verifica si la Talle existe
      const talle = await db.Talles.findByPk(TalleId)
      if (!talle) {
        return res.status(404).json(makeErrorResponse([`Talle con id ${TalleId} no encontrado.`]))
      }

      // Elimina la Talle de la base de datos
      await db.Talles.destroy({
        where: {
          id: TalleId
        }
      });
  
    //  removingLogger.info(talle)
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Talle eliminado correctamente']))

      //res.json(TalleExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:3000/api/Talles/id
  const patchTalleById = async (req, res, next) => {
    try{
    
    const TalleId = req.params.id
   

    const talle = await db.Talles.findByPk(TalleId)
    if (!talle) {
        return res.status(404).json(makeErrorResponse([`Talle con id ${TalleId} no encontrado.`]))
      }
     
      await db.Talles.update(
        {
          descripcion: req.body.descripcion,
         
        },
        
        {
          where: {
            id: TalleId
          },
          
        }
      );
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Talle actualizado correctamente']))

       
    } catch (err) {
      next(err)
    }
}


module.exports = {
    getAllTalles,
    createTalle,
    getTalleById,
    patchTalleById,
    deleteTalleById
}