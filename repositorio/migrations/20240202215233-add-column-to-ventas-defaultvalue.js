'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Ventas', 'estado', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'EN PROCESO'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Ventas', 'estado', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });
  }
};
