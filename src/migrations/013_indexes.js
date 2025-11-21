module.exports = {
  async up(queryInterface, Sequelize) {

    const safeAdd = async (table, cols) => {
      try {
        await queryInterface.addIndex(table, cols);
      } catch (e) {
        console.warn(`Index exists or failed for ${table} (${cols}):`, e.message);
      }
    };

    await safeAdd('products', ['vendor_id', 'status']);
    await safeAdd('products', ['slug']);
    await safeAdd('skus', ['product_id', 'sku']);
    await safeAdd('skus', ['inventory_quantity']);
    await safeAdd('orders', ['user_id', 'status', 'placed_at']);
    await safeAdd('orders', ['order_number']);
    await safeAdd('order_items', ['order_id', 'vendor_id']);
    await safeAdd('vendors', ['status']);
  },

  async down(queryInterface) {
    const safeRemove = async (table, cols) => {
      try {
        await queryInterface.removeIndex(table, cols);
      } catch (e) {
        // ignore
      }
    };

    await safeRemove('products', ['vendor_id', 'status']);
    await safeRemove('products', ['slug']);
    await safeRemove('skus', ['product_id', 'sku']);
    await safeRemove('skus', ['inventory_quantity']);
    await safeRemove('orders', ['user_id', 'status', 'placed_at']);
    await safeRemove('orders', ['order_number']);
    await safeRemove('order_items', ['order_id', 'vendor_id']);
    await safeRemove('vendors', ['status']);
  }
};
