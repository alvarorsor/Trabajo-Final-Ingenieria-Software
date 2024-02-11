'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('lineasDeArticulos', 'devolucionId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Devoluciones',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('lineasDeArticulos', 'devolucionId');
  }
};
