// src/models/role.js
const { DataTypes, Model } = require('sequelize');

class Role extends Model {
  static initModel(sequelize) {
    Role.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, unique: true },
      guard_name: { type: DataTypes.STRING, defaultValue: 'web' }
    }, {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
      timestamps: true
    });

    return Role;
  }

  //  FIX: associate must be INSIDE the class
  static associate(models) {
    Role.belongsToMany(models.User, {
      through: 'role_user',
      foreignKey: 'role_id',
      otherKey: 'user_id'
    });
  }
}

module.exports = Role;
