// src/models/store.js
const { DataTypes, Model } = require('sequelize');

class Store extends Model {
  static initModel(sequelize) {
    Store.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      vendor_id: { type: DataTypes.INTEGER },
      name: { type: DataTypes.STRING },
      domain: { type: DataTypes.STRING },
      is_default: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {
      sequelize,
      modelName: 'Store',
      tableName: 'stores',
      timestamps: true
    });
    return Store;
  }
}

module.exports = Store;
