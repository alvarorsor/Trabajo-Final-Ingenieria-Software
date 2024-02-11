'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('lineasDeArticulos', 'ventaId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Ventas',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('lineasDeArticulos', 'ventaId');
  }
};
