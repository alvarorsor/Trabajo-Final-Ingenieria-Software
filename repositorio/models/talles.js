'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Talles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Talles.belongsTo(models.tipoTalles, {
        foreignKey: 'tipoTalleId',
        as: 'tipoTalle' // Puedes cambiar este alias según tu preferencia
      });
    }
  }
  Talles.init({
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Talles',
  });
  return Talles;
};