'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Sucursales', 'direccion', {
      type: Sequelize.STRING,
      allowNull: false,
      
    });

    await queryInterface.removeColumn('Sucursales', 'numero')
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Sucursales', 'numero', {
      type: Sequelize.INTEGER,
      allowNull: false,
      
    });

    await queryInterface.removeColumn('Sucursales', 'direccion')
  }
};
