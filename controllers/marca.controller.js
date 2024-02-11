
const db = require('../repositorio/models')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')



//POST http://localhost:3000/api/createMarca/
const createMarca = async (req, res, next) => {
    try {
       
      const { descripcion } = req.body

       

       const marcadb = await db.Marcas.create(descripcion)
        
        
    
        apicache.clear()

        res.json(makeSuccessResponse(marcadb))
      } catch (err) {
        next(err)
      }
    
}


//GET http://localhost:8080/Marcas
const getAllMarcas = async (req, res, next) => {
   try{
    const marcas = await db.Marcas.findAll()
    
    res.json(makeSuccessResponse(marcas))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/Marcas/id
const getMarcaById = async (req, res, next) => {
   
    try{
        const MarcaId = req.params.id

        const marca = await db.Marcas.findByPk(MarcaId)

    if(!marca){

    
    return res.status(404).json(makeErrorResponse([`Marca con id ${MarcaId} no encontrada.`]))
   }
   
    
   res.json(makeSuccessResponse(marca))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/Marcas/id
const deleteMarcaById = async (req, res, next) => {
    try {
      const MarcaId = req.params.id
  
      // Verifica si la Marca existe
      const marca = await db.Marcas.findByPk(MarcaId)
      if (!marca) {
        return res.status(404).json(makeErrorResponse([`Marca con id ${MarcaId} no encontrada.`]))
      }
      // Elimina la Marca de la base de datos
      await db.Marcas.destroy({
        where: {
          id: MarcaId
        }
      });
  
     
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Marca eliminada correctamente']))

      //res.json(MarcaExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:3000/api/Marcas/id
  const patchMarcaById = async (req, res, next) => {
    try{
    
    const MarcaId = req.params.id
    
    const marca = await db.Marcas.findByPk(MarcaId)
    if (!marca) {
        return res.status(404).json(makeErrorResponse([`Marca con id ${MarcaId} no encontrada.`]))
      }
     
      await db.Marcas.update(
        {
          descripcion: req.body.descripcion,
         
        },
        
        {
          where: {
            id: MarcaId
          },
          
        }
      );

      
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Marca actualizada correctamente']))

       
    } catch (err) {
      next(err)
    }
}


module.exports = {
    getAllMarcas,
    createMarca,
    getMarcaById,
    patchMarcaById,
    deleteMarcaById
}