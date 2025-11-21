const { DataTypes, Model } = require('sequelize');

class Token extends Model {
  static initModel(sequelize) {
    Token.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER },
      jti: { type: DataTypes.STRING, unique: true }, // token id
      token: { type: DataTypes.TEXT }, // store JWT (optional; here for auditing)
      expires_at: { type: DataTypes.DATE }
    }, {
      sequelize,
      modelName: 'Token',
      tableName: 'tokens',
      timestamps: true
    });
    return Token;
  }
}

module.exports = Token;
