'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Ventas', 'pagoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Pagos',
        key: 'id',
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Ventas', 'pagoId');
  }
};
