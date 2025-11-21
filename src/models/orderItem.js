// src/models/orderItem.js
const { DataTypes, Model } = require('sequelize');

class OrderItem extends Model {
  static initModel(sequelize) {
    OrderItem.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      order_id: { type: DataTypes.INTEGER, allowNull: false },
      sku_id: { type: DataTypes.INTEGER, allowNull: false },
      vendor_id: { type: DataTypes.INTEGER, allowNull: true },
      price: { type: DataTypes.DECIMAL(12,2), allowNull: false },
      qty: { type: DataTypes.INTEGER, allowNull: false },
      total: { type: DataTypes.DECIMAL(12,2), allowNull: false },
      commission_amount: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
      status: { type: DataTypes.STRING, defaultValue: 'ordered' }
    }, {
      sequelize,
      modelName: 'OrderItem',
      tableName: 'order_items',
      timestamps: true
    });

    OrderItem.associate = function(models) {
      OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
      OrderItem.belongsTo(models.Sku, { foreignKey: 'sku_id', as: 'sku' });
      OrderItem.belongsTo(models.Vendor, { foreignKey: 'vendor_id', as: 'vendor' });
    };

    // After create hook: decrement sku inventory and log inventory row.
    OrderItem.addHook('afterCreate', async (item, options) => {
      try {
        const models = sequelize.models;
        const Sku = models.Sku;
        const Inventory = models.Inventory;

        if (!Sku || !Inventory) return;

        const sku = await Sku.findByPk(item.sku_id);
        if (!sku) return;

        // If inventory_policy === 'deny' and not enough quantity, clamp to 0 and log remaining
        if (sku.inventory_policy === 'deny' && sku.inventory_quantity < item.qty) {
          const change = -sku.inventory_quantity;
          if (sku.inventory_quantity !== 0) {
            await sku.update({ inventory_quantity: 0 });
            await Inventory.create({
              sku_id: sku.id,
              qty_change: change,
              reason: 'order_placed',
              reference_id: item.order_id
            });
          }
        } else {
          const change = -item.qty;
          // decrement safely (Sequelize decrement ensures integer math)
          await sku.decrement('inventory_quantity', { by: item.qty });
          await Inventory.create({
            sku_id: sku.id,
            qty_change: change,
            reason: 'order_placed',
            reference_id: item.order_id
          });
        }
      } catch (err) {
        // log but don't throw to avoid breaking order creation flow
        console.error('orderItem afterCreate hook error:', err);
      }
    });

    return OrderItem;
  }
}

module.exports = OrderItem;
