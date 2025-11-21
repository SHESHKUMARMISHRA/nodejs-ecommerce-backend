// src/models/order.js
const { DataTypes, Model } = require('sequelize');

class Order extends Model {
  static initModel(sequelize) {
    Order.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      order_number: { type: DataTypes.STRING, unique: true },
      user_id: { type: DataTypes.INTEGER, allowNull: true },
      status: { type: DataTypes.ENUM('pending','paid','processing','shipped','delivered','cancelled','refunded'), defaultValue: 'pending' },
      payment_status: { type: DataTypes.ENUM('pending','authorized','paid','failed','refunded'), defaultValue: 'pending' },
      currency: { type: DataTypes.STRING(10), defaultValue: 'INR' },
      subtotal: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
      shipping_amount: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
      tax_amount: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
      discount_amount: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
      total: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
      address_shipping_id: { type: DataTypes.INTEGER, allowNull: true },
      address_billing_id: { type: DataTypes.INTEGER, allowNull: true },
      placed_at: { type: DataTypes.DATE, allowNull: true }
    }, {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      timestamps: true
    });

    Order.associate = function(models) {
      Order.hasMany(models.OrderItem, { foreignKey: 'order_id', as: 'items' });
      Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };

    return Order;
  }
}

module.exports = Order;
