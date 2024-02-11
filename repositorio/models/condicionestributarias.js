'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CondicionesTributarias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CondicionesTributarias.init({
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CondicionesTributarias',
  });
  return CondicionesTributarias;
};