'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoComprobantes extends Model {}

  TipoComprobantes.init({
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipoComprobantes',
  });
  return TipoComprobantes;
};