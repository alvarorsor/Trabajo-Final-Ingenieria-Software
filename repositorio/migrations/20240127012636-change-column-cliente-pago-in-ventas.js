'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Ventas', 'clienteId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null, // o false si deseas cambiarlo a no nulo
      references: {
        model: 'Clientes',
        key: 'id',
      },
    });


    await queryInterface.changeColumn('Ventas', 'pagoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null, // o false si deseas cambiarlo a no nulo
      references: {
        model: 'Pagos',
        key: 'id',
      },
    });
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Ventas', 'clienteId', {
      type: Sequelize.INTEGER,
      allowNull: false, // ajusta según tus necesidades
      references: {
        model: 'Clientes',
        key: 'id',
      },
    });

    await queryInterface.changeColumn('Ventas', 'pagoId', {
      type: Sequelize.INTEGER,
      allowNull: false, // ajusta según tus necesidades
      references: {
        model: 'Pagos',
        key: 'id',
      },
    });
  }
};
