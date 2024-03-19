'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lineasDeArticulos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      lineasDeArticulos.belongsTo(models.Stocks, {
        foreignKey: 'stockId',
        as: 'stock' // Puedes cambiar este alias según tu preferencia
      });

      lineasDeArticulos.belongsTo(models.Ventas, {
        foreignKey: 'ventaId',
        as: 'venta' // Puedes cambiar este alias según tu preferencia
      });
    }
  }
  lineasDeArticulos.init({
    cantidad: DataTypes.INTEGER,
    subTotal: DataTypes.DECIMAL,
    tipo: DataTypes.STRING,
    stockId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
    ventaId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
    devolucionId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },

  }, {
    sequelize,
    modelName: 'lineasDeArticulos',
  });
  return lineasDeArticulos;
};