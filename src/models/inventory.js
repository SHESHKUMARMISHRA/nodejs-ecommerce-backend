// src/models/inventory.js
const { DataTypes, Model } = require('sequelize');

class Inventory extends Model {
  static initModel(sequelize) {
    Inventory.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      sku_id: { type: DataTypes.INTEGER, allowNull: false },
      qty_change: { type: DataTypes.INTEGER, allowNull: false },
      reason: { type: DataTypes.STRING, allowNull: true },
      reference_id: { type: DataTypes.INTEGER, allowNull: true }
    }, {
      sequelize,
      modelName: 'Inventory',
      tableName: 'inventories',
      timestamps: true
    });

    Inventory.associate = function(models) {
      Inventory.belongsTo(models.Sku, { foreignKey: 'sku_id', as: 'sku' });
    };

    return Inventory;
  }
}

module.exports = Inventory;
