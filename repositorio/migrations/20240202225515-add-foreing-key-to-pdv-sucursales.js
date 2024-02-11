'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('PuntosDeVenta', 'sucursalId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Sucursales',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('PuntosDeVenta', 'sucursalId');
  }
};
