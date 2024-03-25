'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Ventas', 'nroComprobante');
    await queryInterface.removeColumn('Ventas', 'tipoComprobante');
    await queryInterface.removeColumn('Ventas', 'condicionEmpresa');
    await queryInterface.addColumn('Ventas', 'comprobanteId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Comprobantes',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Ventas', 'nroComprobante', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Ventas', 'tipoComprobante', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Ventas', 'condicionEmpresa', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.removeColumn('Ventas', 'comprobanteId');
  }
};
