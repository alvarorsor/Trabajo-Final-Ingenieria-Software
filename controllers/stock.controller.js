const db = require('../repositorio/models')
const sequelize = db.sequelize
const apicache = require('apicache')
const {makeSuccessResponse} = require('../utils/response.utils')
const {makeErrorResponse} = require('../utils/response.utils')



//POST http://localhost:3000/api/createStock/
const createStock = async (req, res, next) => {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { cantidad, articuloId, colorId, talleId, sucursalId } = req.body;

        // Verificar si los IDs de Articulo, Color y Talle están presentes
        if (!articuloId || !colorId || !talleId) {
            return res.status(400).json(makeErrorResponse(['Los IDs de Articulo, Color y Talle son obligatorios']));
        }

        const stockdb = await db.Stocks.create({cantidad: cantidad, articuloId: articuloId, colorId: colorId, talleId: talleId,
        sucursalId: sucursalId})


        // Responder con éxito
        apicache.clear();
        res.json(makeSuccessResponse(stockdb));
    } catch (err) {
        // Manejar errores
        next(err);
    }
};




//GET http://localhost:8080/Stocks
const getAllStocks = async (req, res, next) => {
   try{
    const stocks = await db.Stocks.findAll()
    
    res.json(makeSuccessResponse(stocks))
}catch(err){
    next(err)
}
}


//GET http://localhost:3000/api/Stocks/id
const getStockById = async (req, res, next) => {
   
    try{
        const StockId = req.params.id

        const stock = await db.Stocks.findByPk(StockId)

    if(!stock){

    
    return res.status(404).json(makeErrorResponse([`Stock con id ${StockId} no encontrado.`]))
   }
   
    
   res.json(makeSuccessResponse(stock))
   
    
    }catch (err){
       next(err)
    }
}



//DELETE http://localhost:3000/api/Stocks/id
const deleteStockById = async (req, res, next) => {
    try {
      const StockId = req.params.id
  
      // Verifica si la Stock existe
      const stock = await db.Stocks.findByPk(StockId)
      if (!stock) {
        return res.status(404).json(makeErrorResponse([`Stock con id ${StockId} no encontrado.`]))
      }
      // Elimina la Stock de la base de datos
      await db.Stocks.destroy({
        where: {
          id: StockId
        }
      });
  
     
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Stock eliminado correctamente']))

      //res.json(StockExistente)
    } catch (err) {
      next(err)
    }
  }


//PATCH http://localhost:3000/api/Stocks/id
  const patchStockById = async (req, res, next) => {
    try{
    
    const StockId = req.params.id
    const stock = await db.Stocks.findByPk(StockId)
    if (!stock) {
        return res.status(404).json(makeErrorResponse([`Stock con id ${StockId} no encontrado.`]))
      }
     
      await db.Stocks.update(
        {
          cantidad: req.body.cantidad,
          articuloId: req.body.articuloId,
          talleId: req.body.talleId,
          colorId: req.body.colorId,
          sucursalId: req.body.sucursalId
        },
        
        {
          where: {
            id: StockId
          },
          
        }
      );

        
       
      
      apicache.clear()
      return res.status(200).json(makeSuccessResponse(['Stock actualizado correctamente']))

       
    } catch (err) {
      next(err)
    }
}

const getStockByBranch = async (req, res, next) => {

    try {
        const branchId = req.params.branchId

        const stock = await sequelize.query(
            'SELECT stocks.id, cantidad, colores.descripcion as color, talles.descripcion as talle, articulos.descripcion as articulo, ' +
            'stocks.colorId, stocks.articuloId, stocks.talleId, articulos.precio_venta as precio, ' +
            'marcas.descripcion as marca, categorias.descripcion as categoria FROM stocks ' +
            'JOIN colores ON stocks.colorId = colores.id ' +
            'JOIN articulos ON stocks.articuloId = articulos.id ' +
            'JOIN talles ON stocks.talleId = talles.id ' +
            'JOIN marcas ON articulos.marcaId = marcas.id ' +
            'JOIN categorias ON articulos.categoriaId = categorias.id ' +
            'WHERE stocks.sucursalId = :branchId ORDER BY stocks.articuloId, stocks.colorId, stocks.talleId',
            {
              replacements: { branchId: branchId }
            }
        )

        const returnStock = stock[0] // Esto es por que la query anterior devuelve un array con la respuesta repetida. Solo nos interesa el primero

        if(returnStock.length == 0){
            return res.status(404).json(makeErrorResponse([`Stock de la sucursal ${branchId} no encontrado.`]))
        }

        res.json(makeSuccessResponse(returnStock))

    } catch (err) {
       next(err)
    }

}


module.exports = {
    getAllStocks,
    createStock,
    getStockById,
    patchStockById,
    deleteStockById,
    getStockByBranch
}