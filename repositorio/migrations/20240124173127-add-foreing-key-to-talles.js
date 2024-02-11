'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Talles', 'tipoTalleId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tipoTalles',
        key: 'id',
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Talles', 'tipoTalleId');
  }
};
