'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios', 'administrativoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Administrativos',
        key: 'id',
      },
    });

    await queryInterface.removeColumn('Vendedores', 'administrativoId');
  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuarios', 'administrativoId');
    await queryInterface.addColumn('Vendedores', 'administrativoId');
  }
};
