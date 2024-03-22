const db = require('../repositorio/models')

const getSiteTransaccionId = async () => {
    const ultimoPago = await db.PagosTarjetas.findOne({
        order: [['createdAt', 'DESC']] // Orden descendente por la columna createdAt
      });
    
      if(!ultimoPago){
        return Math.floor(Math.random() * 10000) + 1
      }else{
        return ultimoPago.site_transaction_id + 1
      }
    }

module.exports = {
    getSiteTransaccionId
}