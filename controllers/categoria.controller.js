
const db = require('../repositorio/models')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')




//POST http://localhost:3000/api/createCategoria/
const createCategoria = async (req, res, next) => {
    try {
       
        // Crear Categoria
        const { descripcion } = req.body

      

       const categoriadb = await db.Categorias.create(descripcion)
        
        
    
        apicache.clear()

        res.json(makeSuccessResponse(categoriadb))
      } catch (err) {
        next(err)
      }
    
}


//GET http://localhost:3000/Categorias
const getAllCategorias = async (req, res, next) => {
   try{

    const categorias = await db.Categorias.findAll()
    
    res.json(makeSuccessResponse(categorias))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/Categorias/id
const getCategoriaById = async (req, res, next) => {
   
    try{
        const CategoriaId = req.params.id

        const categoria = await db.Categorias.findByPk(CategoriaId)

    if(!categoria){

    
    return res.status(404).json(makeErrorResponse([`Categoria con id ${CategoriaId} no encontrada.`]))
   }
   
    
   res.json(makeSuccessResponse(categoria))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/Categorias/id
const deleteCategoriaById = async (req, res, next) => {
    try {
      const CategoriaId = req.params.id
  
      // Verifica si la Categoria existe
      const categoria = await db.Categorias.findByPk(CategoriaId)

      if (!categoria) {
        return res.status(404).json(makeErrorResponse([`Categoria con id ${CategoriaId} no encontrada.`]))
      }
      // Elimina la categoria de la base de datos
      await db.Categorias.destroy({
        where: {
          id: CategoriaId
        }
      });
  
     
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Categoria eliminada correctamente']))

      //res.json(CategoriaExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:3000/api/Categorias/id
  const patchCategoriaById = async (req, res, next) => {
    try{
    
    const CategoriaId = req.params.id
    // Encuentra el índice del autor con el ID especificado
    const categoria = await db.Categorias.findByPk(CategoriaId)
    if (!categoria) {
        return res.status(404).json(makeErrorResponse([`Categoria con id ${CategoriaId} no encontrada.`]))
      }
     
      await db.Categorias.update(
        {
          descripcion: req.body.descripcion,
         
        },
        
        {
          where: {
            id: CategoriaId
          },
          
        }
      );
       
      
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Categoria actualizada correctamente']))

       
    } catch (err) {
      next(err)
    }
}


module.exports = {
    getAllCategorias,
    createCategoria,
    getCategoriaById,
    patchCategoriaById,
    deleteCategoriaById
}