// src/models/personalAccessToken.js
const { DataTypes, Model } = require('sequelize');

class PersonalAccessToken extends Model {
  static initModel(sequelize) {
    PersonalAccessToken.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      tokenable_type: { type: DataTypes.STRING, allowNull: false },
      tokenable_id: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      token: { type: DataTypes.STRING(64), unique: true, allowNull: false },
      abilities: { type: DataTypes.TEXT, allowNull: true },
      last_used_at: { type: DataTypes.DATE, allowNull: true },
      expires_at: { type: DataTypes.DATE, allowNull: true }
    }, {
      sequelize,
      modelName: 'PersonalAccessToken',
      tableName: 'personal_access_tokens',
      timestamps: true
    });

    // Associations left generic because tokenable is polymorphic.
    // Helper methods can be added in services/controllers as needed.

    return PersonalAccessToken;
  }
}

module.exports = PersonalAccessToken;
