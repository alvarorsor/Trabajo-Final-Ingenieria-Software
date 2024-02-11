'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Clientes', 'CUIT', {
      type: Sequelize.BIGINT,
      allowNull: false,
      unique: true
    });
  },  

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Clientes', 'CUIT', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    });
  }
};
