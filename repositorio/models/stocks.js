'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stocks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stocks.belongsTo(models.Colores, {
        foreignKey: 'colorId',
        as: 'color' // Puedes cambiar este alias según tu preferencia
      });

      Stocks.belongsTo(models.Talles, {
        foreignKey: 'talleId',
        as: 'talle' // Puedes cambiar este alias según tu preferencia
      });

      Stocks.belongsTo(models.Articulos, {
        foreignKey: 'articuloId',
        as: 'articulo' // Puedes cambiar este alias según tu preferencia
      });
    }
  }
  Stocks.init({
    cantidad: DataTypes.INTEGER,
    sucursalId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
  }, {
    sequelize,
    modelName: 'Stocks',
  });
  return Stocks;
};