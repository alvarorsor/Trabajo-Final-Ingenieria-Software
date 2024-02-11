'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pagos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pagos.init({
    monto: DataTypes.DECIMAL,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pagos',
  });
  return Pagos;
};