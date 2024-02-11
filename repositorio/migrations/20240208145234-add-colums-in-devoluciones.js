'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
    async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('Devoluciones', 'nroComprobante', {
        type: Sequelize.STRING,
        allowNull: true,
      });
  
      await queryInterface.addColumn('Devoluciones', 'vendedorId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Vendedores',
          key: 'id',
        },
      });
  
      await queryInterface.addColumn('Devoluciones', 'sucursalId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Sucursales',
          key: 'id',
        },
      });
  
      await queryInterface.addColumn('Devoluciones', 'PDVId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'PuntosDeVenta',
          key: 'id',
        },
      });
  
      await queryInterface.addColumn('Devoluciones', 'condicionEmpresa', {
        type: Sequelize.STRING,
        defaulValue: "RESPONSABLE INSCRIPTO",
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Devoluciones', 'nroComprobante');
    await queryInterface.removeColumn('Devoluciones', 'vendedorId');
    await queryInterface.removeColumn('Devoluciones', 'sucursalId');
    await queryInterface.removeColumn('Devoluciones', 'PDVId');
    await queryInterface.removeColumn('Devoluciones', 'condicionEmpresa');
  }
};
