// migrations/011_create_orders.js
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, ENUM, DECIMAL, DATE } = Sequelize;
    await queryInterface.createTable('orders', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      order_number: { type: STRING, unique: true },
      user_id: { type: INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL', allowNull: true },
      status: { type: ENUM('pending','paid','processing','shipped','delivered','cancelled','refunded'), defaultValue: 'pending' },
      payment_status: { type: ENUM('pending','authorized','paid','failed','refunded'), defaultValue: 'pending' },
      currency: { type: STRING(10), defaultValue: 'INR' },
      subtotal: { type: DECIMAL(12,2), defaultValue: 0 },
      shipping_amount: { type: DECIMAL(12,2), defaultValue: 0 },
      tax_amount: { type: DECIMAL(12,2), defaultValue: 0 },
      discount_amount: { type: DECIMAL(12,2), defaultValue: 0 },
      total: { type: DECIMAL(12,2), defaultValue: 0 },
      address_shipping_id: { type: INTEGER, allowNull: true },
      address_billing_id: { type: INTEGER, allowNull: true },
      placed_at: { type: DATE, allowNull: true },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('orders');
  }
};
