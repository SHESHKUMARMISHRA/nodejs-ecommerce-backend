// src/models/user.js
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        uuid: { type: DataTypes.STRING, unique: true },
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, unique: true },
        password: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        is_vendor: { type: DataTypes.BOOLEAN, defaultValue: false },
        email_verified_at: { type: DataTypes.DATE },
        last_login_at: { type: DataTypes.DATE },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        paranoid: true,
      }
    );

    User.addHook("beforeCreate", async (user) => {
      if (user.password) user.password = await bcrypt.hash(user.password, 10);
    });
    User.addHook("beforeUpdate", async (user) => {
      if (user.changed("password"))
        user.password = await bcrypt.hash(user.password, 10);
    });

    return User;
  }

  // ADD THIS
  static associate(models) {
    // many-to-many roles
    User.belongsToMany(models.Role, {
      through: "role_user",
      foreignKey: "user_id",
      otherKey: "role_id",
    });

    // one-to-one vendor
    User.hasOne(models.Vendor, {
      foreignKey: "user_id",
      as: "vendor",
    });
  }

  async verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  toJSON() {
    const obj = Object.assign({}, this.get());
    delete obj.password;
    return obj;
  }
}

module.exports = User;
