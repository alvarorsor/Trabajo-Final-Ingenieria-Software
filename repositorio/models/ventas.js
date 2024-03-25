'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ventas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ventas.belongsTo(models.Pagos, {
        foreignKey: 'pagoId',
        as: 'pago' // Puedes cambiar este alias según tu preferencia
      });

      Ventas.belongsTo(models.Clientes, {
        foreignKey: 'clienteId',
        as: 'cliente' // Puedes cambiar este alias según tu preferencia
      });

      Ventas.belongsTo(models.Comprobantes, {
        foreignKey: 'comprobanteId',
        as: 'comprobante' // Puedes cambiar este alias según tu preferencia
      });
    }
  }
  Ventas.init({
    fecha: DataTypes.DATE,
    estado: DataTypes.STRING,
    total: DataTypes.DECIMAL,
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
    pagoId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
    pagoTarjetaId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
    comprobanteId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
    vendedorId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
    sucursalId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
    PDVId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Modificado para permitir valores nulos
    },
  }, {
    sequelize,
    modelName: 'Ventas',
  });
  return Ventas;
};