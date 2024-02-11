'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Stocks', 'colorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Colores',
        key: 'id',
      },
      
    });

    await queryInterface.addColumn('Stocks', 'talleId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Talles',
        key: 'id',
      },
      
    });

    await queryInterface.addColumn('Stocks', 'articuloId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Articulos',
        key: 'id',
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Talles', 'colorId');
    await queryInterface.removeColumn('Talles', 'talleId');
    await queryInterface.removeColumn('Talles', 'articuloId');
  }
};
