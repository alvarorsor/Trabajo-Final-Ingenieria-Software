'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PuntosDeVenta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PuntosDeVenta.init({
    numero: DataTypes.INTEGER,
    sucursalId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
  }, {
    sequelize,
    modelName: 'PuntosDeVenta',
  });
  return PuntosDeVenta;
};