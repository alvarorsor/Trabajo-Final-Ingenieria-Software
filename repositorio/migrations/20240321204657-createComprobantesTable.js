'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {

    await queryInterface.createTable('TipoComprobantes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
    descripcion: {
        type: DataTypes.STRING
      },
    })
 
    await queryInterface.createTable('Comprobantes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      cae: {
        type: DataTypes.STRING
      },
      numero: {
        type: DataTypes.STRING
      },
      estado: {
        type: DataTypes.STRING
      },
      ventaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Ventas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tipoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'TipoComprobantes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });

    await queryInterface.addConstraint('Comprobantes', {
      fields: ['ventaId', 'tipoId'],
      type: 'unique',
      name: 'comprobantes_ventaId_tipoId_unique'
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Comprobantes');
    await queryInterface.dropTable('TipoComprobantes')
  }
};