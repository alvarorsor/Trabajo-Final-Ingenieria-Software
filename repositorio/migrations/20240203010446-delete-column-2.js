'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuarios', 'nombre');
    await queryInterface.removeColumn('Usuarios', 'apellido');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuarios', 'nombre');
    await queryInterface.removeColumn('Usuarios', 'apellido');
  }
};
