'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Ventas', 'clienteId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Clientes',
        key: 'id',
      },
      
    });


    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Ventas', 'clienteId');
  }
};
