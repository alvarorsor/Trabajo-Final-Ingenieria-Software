'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Vendedores', 'puntoDeVentaId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'PuntosDeVenta',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Vendedores', 'puntoDeVentaId');
  }
};
