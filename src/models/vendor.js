// src/models/vendor.js
const { DataTypes, Model } = require('sequelize');

class Vendor extends Model {
  static initModel(sequelize) {
    Vendor.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER },
      company_name: { type: DataTypes.STRING },
      slug: { type: DataTypes.STRING },
      status: { type: DataTypes.ENUM('pending','active','suspended','closed'), defaultValue: 'pending' },
      rating: { type: DataTypes.DECIMAL(3,2), defaultValue: 0 }
    }, {
      sequelize,
      modelName: 'Vendor',
      tableName: 'vendors',
      timestamps: true,
      paranoid: true
    });
    return Vendor;
  }

  static associate(models) {
    Vendor.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  }

}

module.exports = Vendor;
