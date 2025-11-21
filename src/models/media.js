// src/models/media.js
const { DataTypes, Model } = require('sequelize');

class Media extends Model {
  static initModel(sequelize) {
    Media.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      uuid: { type: DataTypes.STRING, unique: true },
      vendor_id: { type: DataTypes.INTEGER, allowNull: true },
      filename: { type: DataTypes.STRING, allowNull: false },
      path: { type: DataTypes.STRING, allowNull: false },
      disk: { type: DataTypes.STRING, defaultValue: 's3' },
      mime: { type: DataTypes.STRING, allowNull: true },
      size: { type: DataTypes.INTEGER, allowNull: true },
      meta: { type: DataTypes.JSON, allowNull: true }
    }, {
      sequelize,
      modelName: 'Media',
      tableName: 'media',
      timestamps: true
    });

    Media.associate = function(models) {
      Media.belongsTo(models.Vendor, { foreignKey: 'vendor_id', as: 'vendor' });
    };

    return Media;
  }
}

module.exports = Media;
