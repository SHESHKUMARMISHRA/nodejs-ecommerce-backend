const { DataTypes, Model } = require("sequelize");

class Sku extends Model {
  static initModel(sequelize) {
    Sku.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      sku: { type: DataTypes.STRING, allowNull: false, unique: true },
      price: { type: DataTypes.DECIMAL(12, 2) },
      compare_at_price: { type: DataTypes.DECIMAL(12, 2) },
      inventory_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
      inventory_policy: { type: DataTypes.ENUM("deny", "continue"), defaultValue: "deny" },
      attributes: { type: DataTypes.JSON },
      active: { type: DataTypes.BOOLEAN, defaultValue: true },
    }, {
      sequelize,
      modelName: "Sku",
      tableName: "skus",
      timestamps: true,
      paranoid: true,
    });
    return Sku;
  }

  static associate(models) {
    Sku.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  }
}


module.exports = Sku;
