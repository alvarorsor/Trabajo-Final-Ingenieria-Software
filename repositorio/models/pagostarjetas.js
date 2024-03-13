'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PagosTarjetas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PagosTarjetas.init({
    site_transaction_id: DataTypes.INTEGER,
    card_brand: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    currency: DataTypes.STRING,
    status: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PagosTarjetas',
  });
  return PagosTarjetas;
};