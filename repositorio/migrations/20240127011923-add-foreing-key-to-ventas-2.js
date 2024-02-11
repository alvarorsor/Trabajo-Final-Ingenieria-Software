'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Modificar la columna para permitir valores nulos
    await queryInterface.changeColumn('Ventas', 'clienteId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Clientes',
        key: 'id',
      },
    });

    await queryInterface.changeColumn('Ventas', 'pagoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Pagos',
        key: 'id',
      },
    });

   
  },

  async down(queryInterface, Sequelize) {
    // Volver a establecer el allowNull a false si es necesario
    await queryInterface.changeColumn('Ventas', 'clienteId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Clientes',
        key: 'id',
      },
    });

    await queryInterface.changeColumn('Ventas', 'pagoId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Pagos',
        key: 'id',
      },
    });
  }
};

