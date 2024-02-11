'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articulos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Asociación con la tabla 'Marca'
      Articulos.belongsTo(models.Marcas, {
        foreignKey: 'marcaId',
        as: 'marca' // Puedes cambiar este alias según tu preferencia
      });

      // Asociación con la tabla 'Categoria'
      Articulos.belongsTo(models.Categorias, {
        foreignKey: 'categoriaId',
        as: 'categoria' // Puedes cambiar este alias según tu preferencia
      });
    }
  }
  Articulos.init({
    codigo: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    costo: DataTypes.DECIMAL,
    margen_ganancia: DataTypes.DECIMAL,
    neto_gravado: DataTypes.DECIMAL,
    precio_venta: DataTypes.DECIMAL,
    IVA: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Articulos',
  });
  return Articulos;
};