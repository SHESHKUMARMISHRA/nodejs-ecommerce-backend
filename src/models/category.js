// src/models/category.js
const { DataTypes, Model } = require('sequelize');

class Category extends Model {
  static initModel(sequelize) {
    Category.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, unique: true, allowNull: false },
      parent_id: { type: DataTypes.INTEGER, allowNull: true },
      active: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: true
    });

    // Self-referential association helper (optional wiring in index.js)
    Category.associate = function(models) {
      Category.hasMany(models.Category, { foreignKey: 'parent_id', as: 'children' });
      Category.belongsTo(models.Category, { foreignKey: 'parent_id', as: 'parent' });
    };

    return Category;
  }
}

module.exports = Category;
