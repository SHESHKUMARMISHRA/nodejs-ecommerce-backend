// migrations/005_create_products.js
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, TEXT, ENUM, BOOLEAN, JSON, DATE } = Sequelize;
    await queryInterface.createTable('products', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      vendor_id: { type: INTEGER, references: { model: 'vendors', key: 'id' }, onDelete: 'CASCADE' },
      store_id: { type: INTEGER, allowNull: true, references: { model: 'stores', key: 'id' }, onDelete: 'SET NULL' },
      name: { type: STRING },
      slug: { type: STRING, unique: true },
      short_description: { type: TEXT, allowNull: true },
      description: { type: TEXT, allowNull: true },
      type: { type: ENUM('simple','variable','digital','service'), defaultValue: 'simple' },
      status: { type: ENUM('draft','pending','published','archived'), defaultValue: 'draft' },
      featured: { type: BOOLEAN, defaultValue: false },
      meta: { type: JSON, allowNull: true },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: { type: DATE, allowNull: true }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('products');
  }
};
