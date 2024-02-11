'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendedores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vendedores.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull:false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull:false
    },
    legajo: {
      type: DataTypes.INTEGER,
      unique:true
    },
    puntoDeVentaId: {
      type: DataTypes.INTEGER,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Vendedores',
  });
  return Vendedores;
};