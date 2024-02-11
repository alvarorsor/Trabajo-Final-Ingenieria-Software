'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Stocks', 'sucursalId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Sucursales',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Stocks', 'sucursalId');
  }
};
