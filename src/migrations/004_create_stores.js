// migrations/004_create_stores.js
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, BOOLEAN, DATE } = Sequelize;
    await queryInterface.createTable('stores', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      vendor_id: { type: INTEGER, references: { model: 'vendors', key: 'id' }, onDelete: 'CASCADE' },
      name: { type: STRING },
      domain: { type: STRING, allowNull: true },
      is_default: { type: BOOLEAN, defaultValue: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('stores');
  }
};
