'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   // Agregar las foreign keys a la tabla 'Articulos'
   await queryInterface.addColumn('Articulos', 'marcaId', {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Marcas',
      key: 'id',
    },
    
  });

  await queryInterface.addColumn('Articulos', 'categoriaId', {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Categorias',
      key: 'id',
    },
   
  });
},

  async down (queryInterface, Sequelize) {
   // Eliminar las foreign keys de la tabla 'Articulos'
   await queryInterface.removeColumn('Articulos', 'marcaId');
   await queryInterface.removeColumn('Articulos', 'categoriaId');
  }
};
