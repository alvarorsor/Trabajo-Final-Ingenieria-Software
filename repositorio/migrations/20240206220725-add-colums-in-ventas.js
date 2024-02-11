'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Ventas', 'nroComprobante', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Ventas', 'vendedorId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Vendedores',
        key: 'id',
      },
    });

    await queryInterface.addColumn('Ventas', 'sucursalId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Sucursales',
        key: 'id',
      },
    });

    await queryInterface.addColumn('Ventas', 'PDVId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'PuntosDeVenta',
        key: 'id',
      },
    });

    await queryInterface.addColumn('Ventas', 'condicionEmpresa', {
      type: Sequelize.STRING,
      defaulValue: "RESPONSABLE INSCRIPTO",
    });


  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('Ventas', 'nroComprobante');
     await queryInterface.removeColumn('Ventas', 'vendedorId');
     await queryInterface.removeColumn('Ventas', 'sucursalId');
     await queryInterface.removeColumn('Ventas', 'PDVId');
     await queryInterface.removeColumn('Ventas', 'condicionEmpresa');
  }
};
