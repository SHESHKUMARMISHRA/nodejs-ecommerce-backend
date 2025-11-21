// migrations/010_create_inventories.js
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('inventories', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      sku_id: { type: INTEGER, references: { model: 'skus', key: 'id' }, onDelete: 'CASCADE' },
      qty_change: { type: INTEGER },
      reason: { type: STRING, allowNull: true },
      reference_id: { type: INTEGER, allowNull: true },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('inventories');
  }
};
