const db = require('../repositorio/models')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')




const createCondicionTributaria = async (req, res, next) => {
    try {
       
        
        const { descripcion } = req.body

       
        const condicionTributariadb = await db.CondicionesTributarias.create({descripcion: descripcion})
    
        apicache.clear()
        res.json(makeSuccessResponse(condicionTributariadb))
      } catch (err) {
        next(err)
      }
    
}


const getAllCondicionesTributarias = async (req, res, next) => {
   try{
    const condicionTributariadb = await db.CondicionesTributarias.findAll()
    
    res.json(makeSuccessResponse(condicionTributariadb))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/Colors/id
const getCondicionTributariaById = async (req, res, next) => {
   
    try{
        const condicionTributariaId = req.params.id

        const condicionTributaria = await db.CondicionesTributarias.findByPk(condicionTributariaId)

    if(!condicionTributaria){

    
    return res.status(404).json(makeErrorResponse([`condicion tributaria con id ${condicionTributariaId} no encontrado.`]))
   }
   
    
   res.json(makeSuccessResponse(condicionTributaria))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/Colors/id
const deleteCondicionTributariaById = async (req, res, next) => {
    try {
      const condicionTributariaId = req.params.id
  
     
      const condicionTributaria = await db.CondicionesTributarias.findByPk(condicionTributariaId)
      if (!condicionTributaria) {
        return res.status(404).json(makeErrorResponse([`condicion tributaria con id ${condicionTributariaId} no encontrado.`]))
      }


     
      await db.CondicionesTributarias.destroy({
        where: {
          id: condicionTributariaId
        }
      });
  
     
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['condicion tributaria eliminado correctamente']))

      
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:3000/api/Colors/id
  const patchCondicionTributariaById = async (req, res, next) => {
    try{
    
    const condicionTributariaId = req.params.id
    o
    const condicionTributaria = await db.CondicionesTributarias.findByPk(condicionTributariaId)
      if (!condicionTributaria) {
        return res.status(404).json(makeErrorResponse([`condicion tributaria con id ${condicionTributariaId} no encontrado.`]))
      }

     
       await db.CondicionesTributarias.update(
        {
          descripcion: req.body.descripcion,
         
        },
        
        {
          where: {
            id: condicionTributariaId
          },
          
        }
      );
      
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['condicion tributaria actualizado correctamente']))

       
    } catch (err) {
      next(err)
    }
}


module.exports = {
    getAllCondicionesTributarias,
    createCondicionTributaria,
    patchCondicionTributariaById,
    getCondicionTributariaById,
    deleteCondicionTributariaById
}