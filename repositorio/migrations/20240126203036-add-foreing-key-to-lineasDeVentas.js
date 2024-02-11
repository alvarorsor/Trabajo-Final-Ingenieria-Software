'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('lineasDeArticulos', 'articuloId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Articulos',
        key: 'id',
      },
      
    });

    await queryInterface.addColumn('lineasDeArticulos', 'colorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Colores',
        key: 'id',
      },
      
    });

    await queryInterface.addColumn('lineasDeArticulos', 'talleId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Talles',
        key: 'id',
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('lineasDeArticulos', 'articuloId');
    await queryInterface.removeColumn('lineasDeArticulos', 'colorId');
    await queryInterface.removeColumn('lineasDeArticulos', 'talleId');
  }
};
