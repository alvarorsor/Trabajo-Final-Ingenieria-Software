'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios', 'vendedorId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Vendedores',
        key: 'id',
      },
    });

    await queryInterface.addColumn('Vendedores', 'administrativoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Administrativos',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuarios', 'vendedorId');
    await queryInterface.removeColumn('Vendedores', 'administrativoId');
  }
};
