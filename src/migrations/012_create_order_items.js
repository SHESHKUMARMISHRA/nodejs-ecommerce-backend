// migrations/012_create_order_items.js
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DECIMAL, STRING, DATE } = Sequelize;
    await queryInterface.createTable('order_items', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      order_id: { type: INTEGER, references: { model: 'orders', key: 'id' }, onDelete: 'CASCADE' },
      sku_id: { type: INTEGER, references: { model: 'skus', key: 'id' }, onDelete: 'CASCADE' },
      vendor_id: { type: INTEGER, references: { model: 'vendors', key: 'id' }, onDelete: 'SET NULL', allowNull: true },
      price: { type: DECIMAL(12,2) },
      qty: { type: INTEGER },
      total: { type: DECIMAL(12,2) },
      commission_amount: { type: DECIMAL(12,2), defaultValue: 0 },
      status: { type: STRING, defaultValue: 'ordered' },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('order_items');
  }
};
