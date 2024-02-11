'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Ventas', 'total', {
      
      type: Sequelize.DECIMAL,
      defaultValue: 0.0, // o false si deseas cambiarlo a no nulo
      
    });

    await queryInterface.changeColumn('Ventas', 'estado', {
      type: Sequelize.STRING,
      defaultValue: "EN PROCESO", // o false si deseas cambiarlo a no nulo
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Ventas', 'total', {
      type: Sequelize.STRING,
        allowNull: true,
  }
    );

    await queryInterface.changeColumn('Ventas', 'estado', {
      type: Sequelize.STRING,
        allowNull: true,
  }
    );





}

}