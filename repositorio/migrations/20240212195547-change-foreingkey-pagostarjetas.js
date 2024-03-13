'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Ventas', 'pagoTarjetaId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'PagosTarjetas',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Ventas', 'pagoTarjetaId');
  }
};
