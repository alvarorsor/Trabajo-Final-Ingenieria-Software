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
      lineasDeArticulos.belongsTo(models.Articulos, {
        foreignKey: 'articuloId',
        as: 'articulo' // Puedes cambiar este alias según tu preferencia
      });

      lineasDeArticulos.belongsTo(models.Colores, {
        foreignKey: 'colorId',
        as: 'color' // Puedes cambiar este alias según tu preferencia
      });

      lineasDeArticulos.belongsTo(models.Talles, {
        foreignKey: 'talleId',
        as: 'talle' // Puedes cambiar este alias según tu preferencia
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
    articuloId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
    talleId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
    colorId: {
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