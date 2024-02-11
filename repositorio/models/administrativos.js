'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Administrativos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Administrativos.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    legajo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Administrativos',
  });
  return Administrativos;
};