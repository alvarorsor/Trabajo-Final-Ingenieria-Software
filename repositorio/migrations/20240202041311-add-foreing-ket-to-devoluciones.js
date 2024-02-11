'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Devoluciones', 'clienteId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Clientes',
        key: 'id',
      },
    });

    await queryInterface.addColumn('Devoluciones', 'pagoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Pagos',
        key: 'id',
      },
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Devoluciones', 'clienteId');
    await queryInterface.removeColumn('Devoluciones', 'pagoId');
  }
};
