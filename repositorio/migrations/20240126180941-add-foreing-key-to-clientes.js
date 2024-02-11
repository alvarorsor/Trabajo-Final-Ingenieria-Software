'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Clientes', 'condicionTributariaId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'CondicionesTributarias',
        key: 'id',
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Clientes', 'condicionTributariaId');
  }
};
