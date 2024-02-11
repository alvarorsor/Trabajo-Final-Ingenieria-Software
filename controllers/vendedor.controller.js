
const db = require('../repositorio/models')
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')



//POST http://localhost:3000/api/createVendedor/
const createVendedor = async (req, res, next) => {
    try {
      
        // Crear Vendedor
        const { nombre, apellido, legajo, puntoDeVentaId } = req.body

     
        
        const vendedordb = await db.Vendedores.create({nombre: nombre, apellido:apellido,legajo:legajo,puntoDeVentaId:puntoDeVentaId})
    
        apicache.clear()
        res.json(makeSuccessResponse(vendedordb))
      } catch (err) {
        next(err)
      }
    
}


//GET http://localhost:8080/Vendedors
const getAllVendedors = async (req, res, next) => {
   try{
    const Vendedores = await db.Vendedores.findAll()
    
    res.json(makeSuccessResponse(Vendedores))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/Vendedors/id
const getVendedorById = async (req, res, next) => {
   
    try{
        const VendedorId = req.params.id

        const Vendedor = await db.Vendedores.findByPk(VendedorId)

    if(!Vendedor){

    
    return res.status(404).json(makeErrorResponse([`Vendedor con id ${VendedorId} no encontrado.`]))
   }
   
    
   res.json(makeSuccessResponse(Vendedor))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/Vendedors/id
const deleteVendedorById = async (req, res, next) => {
    try {
      const VendedorId = req.params.id
  
      // Verifica si la Vendedor existe
      const Vendedor = await db.Vendedores.findByPk(VendedorId)
      if (!Vendedor) {
        return res.status(404).json(makeErrorResponse([`Vendedor con id ${VendedorId} no encontrado.`]))
      }


      // Elimina la Vendedor de la base de datos
      await db.Vendedores.destroy({
        where: {
          id: VendedorId
        }
      });
  
     
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Vendedor eliminado correctamente']))

      //res.json(VendedorExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:3000/api/Vendedors/id
  const patchVendedorById = async (req, res, next) => {
    try{
    
    const VendedorId = req.params.id
    // Encuentra el índice del autor con el ID especificado
    const Vendedor = await db.Vendedores.findByPk(VendedorId)
    if (!Vendedor) {
        return res.status(404).json(makeErrorResponse([`Vendedor con id ${VendedorId} no encontrado.`]))
      }

     
       await db.Vendedores.update(
        {
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          legajo: req.body.legajo,
          puntoDeVentaId: req.body.puntoDeVentaId
         
        },
        
        {
          where: {
            id: VendedorId
          },
          
        }
      );
      
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Vendedor actualizado correctamente']))

       
    } catch (err) {
      next(err)
    }
}


module.exports = {
    getAllVendedors,
    createVendedor,
    getVendedorById,
    patchVendedorById,
    deleteVendedorById
}