const db = require('../repositorio/models')
const Articulo = require('../models/Articulo')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')



//POST http://localhost:3000/api/createArticulo/
const createArticulo = async (req, res, next) => {
    try {
       
        // Crear Articulo
        const { codigo, descripcion, costo, margen_ganancia, marcaId, categoriaId } = req.body


       
        const articulo = new Articulo(codigo, descripcion, costo, margen_ganancia)
        
    
     

       const articulodb = await db.Articulos.create({
          codigo: articulo.codigo,
          descripcion: articulo.descripcion,
          costo: articulo.costo,
          margen_ganancia: articulo.margen_ganancia,
          neto_gravado: articulo.neto_gravado,
          IVA: articulo.IVA,
          precio_venta: articulo.precio_venta,
          marcaId: marcaId,
          categoriaId: categoriaId
      });

   
      
          
        apicache.clear()

        res.json(makeSuccessResponse(articulodb))
      } catch (err) {
        next(err)
      }
    
}


//GET http://localhost:8080/Articulos
const getAllArticulos = async (req, res, next) => {
   try{
    const articulos = await db.Articulos.findAll()
    
    res.json(makeSuccessResponse(articulos))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/Articulos/id
const getArticuloByCodigo = async (req, res, next) => {
   
    try{
        const codigoId = req.params.codigo

        const articulo = await db.Articulos.findAll({
          where: { codigo: codigoId }});
    //const articulo = await db.Articulos.findByPk(ArticuloId)

    if(!articulo){

    return res.status(404).json(makeErrorResponse([`Articulo con codigo ${codigoId} no encontrado.`]))
   }
   
    
   res.json(makeSuccessResponse(articulo))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/Articulos/id
const deleteArticuloById = async (req, res, next) => {
    try {
      const ArticuloId = req.params.id
  
      // Verifica si la Articulo existe
      const articulo = await db.Articulos.findByPk(ArticuloId)
      if (!articulo) {
        return res.status(404).json(makeErrorResponse([`Articulo con id ${ArticuloId} no encontrado.`]))
      }
      // Elimina la Articulo de la base de datos
      const articuloEliminado = await db.Articulos.destroy({
        where: {
          id: ArticuloId
        }
      });

      
  
     
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Articulo eliminado correctamente']))

      //res.json(ArticuloExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:3000/api/Articulos/id
  const patchArticuloById = async (req, res, next) => {
    try{
    
    const ArticuloId = req.params.id
    // Encuentra el índice del autor con el ID especificado
    const articulo = await db.Articulos.findByPk(ArticuloId)
    if (!articulo) {
        return res.status(404).json(makeErrorResponse([`Articulo con id ${ArticuloId} no encontrado.`]))
      }

      
     
       await db.Articulos.update(
        {
          descripcion: req.body.descripcion,
          codigo: req.body.codigo,
          margen_ganancia: req.body.margen_ganancia,
          costo: req.body.costo
        },
        
        {
          where: {
            id: ArticuloId
          },
          
        }
      );

     

    
      
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Articulo actualizado correctamente']))

       
    } catch (err) {
      next(err)
    }
}


module.exports = {
    getAllArticulos,
    createArticulo,
    getArticuloByCodigo,
    patchArticuloById,
    deleteArticuloById
}