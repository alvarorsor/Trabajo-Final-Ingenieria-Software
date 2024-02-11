'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articulos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      costo: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      margen_ganancia: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      neto_gravado: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      precio_venta: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      IVA: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Articulos');
  }
};