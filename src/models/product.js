// src/models/product.js
const { DataTypes, Model } = require("sequelize");

class Product extends Model {
  static initModel(sequelize) {
    Product.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      vendor_id: { type: DataTypes.INTEGER },
      store_id: { type: DataTypes.INTEGER, allowNull: true },
      name: { type: DataTypes.STRING },
      slug: { type: DataTypes.STRING, unique: true },
      short_description: { type: DataTypes.TEXT },
      description: { type: DataTypes.TEXT },
      type: { type: DataTypes.ENUM('simple','variable','digital','service'), defaultValue: 'simple' },
      status: { type: DataTypes.ENUM('draft','pending','published','archived'), defaultValue: 'draft' },
      featured: { type: DataTypes.BOOLEAN, defaultValue: false },
      meta: { type: DataTypes.JSON }
    }, {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      timestamps: true,
      paranoid: true
    });
    return Product;
  }

  static associate(models) {
    Product.hasMany(models.Sku, { foreignKey: 'product_id', as: 'skus' });
    Product.belongsTo(models.Vendor, { foreignKey: 'vendor_id', as: 'vendor' });
  }
}


module.exports = Product;
