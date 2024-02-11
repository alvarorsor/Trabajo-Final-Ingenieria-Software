'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clientes.belongsTo(models.CondicionesTributarias, {
        foreignKey: 'condicionTributariaId',
        as: 'condicionTributaria' // Puedes cambiar este alias según tu preferencia
      });
    }
  }
  Clientes.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    domicilio: DataTypes.STRING,
    CUIT: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Clientes',
  });
  return Clientes;
};