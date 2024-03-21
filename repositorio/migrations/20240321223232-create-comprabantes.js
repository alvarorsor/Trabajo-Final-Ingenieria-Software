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
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Comprobantes');
    await queryInterface.dropTable('TipoComprobantes')
  }
};