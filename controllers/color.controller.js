
const db = require('../repositorio/models')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')



//POST http://localhost:3000/api/createColor/
const createColor = async (req, res, next) => {
    try {
       
        // Crear Color
        const { descripcion } = req.body

       
        
        const categoriadb = await db.Colores.create(descripcion)
    
        apicache.clear()
        res.json(makeSuccessResponse(categoriadb))
      } catch (err) {
        next(err)
      }
    
}


//GET http://localhost:8080/Colors
const getAllColors = async (req, res, next) => {
   try{
    const colores = await db.Colores.findAll()
    
    res.json(makeSuccessResponse(colores))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/Colors/id
const getColorById = async (req, res, next) => {
   
    try{
        const ColorId = req.params.id

        const color = await db.Colores.findByPk(ColorId)

    if(!color){

    
    return res.status(404).json(makeErrorResponse([`Color con id ${ColorId} no encontrado.`]))
   }
   
    
   res.json(makeSuccessResponse(color))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/Colors/id
const deleteColorById = async (req, res, next) => {
    try {
      const ColorId = req.params.id
  
      // Verifica si la Color existe
      const color = await db.Colores.findByPk(ColorId)
      if (!color) {
        return res.status(404).json(makeErrorResponse([`Color con id ${ColorId} no encontrado.`]))
      }


      // Elimina la Color de la base de datos
      await db.Colores.destroy({
        where: {
          id: ColorId
        }
      });
  
     
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Color eliminado correctamente']))

      //res.json(ColorExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:3000/api/Colors/id
  const patchColorById = async (req, res, next) => {
    try{
    
    const ColorId = req.params.id
    // Encuentra el índice del autor con el ID especificado
    const color = await db.Colores.findByPk(ColorId)
    if (!color) {
        return res.status(404).json(makeErrorResponse([`Color con id ${ColorId} no encontrado.`]))
      }

     
       await db.Colores.update(
        {
          descripcion: req.body.descripcion,
         
        },
        
        {
          where: {
            id: ColorId
          },
          
        }
      );
      
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Color actualizado correctamente']))

       
    } catch (err) {
      next(err)
    }
}


module.exports = {
    getAllColors,
    createColor,
    getColorById,
    patchColorById,
    deleteColorById
}