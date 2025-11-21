// migrations/007_create_categories.js
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, BOOLEAN, DATE } = Sequelize;
    await queryInterface.createTable('categories', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING },
      slug: { type: STRING, unique: true },
      parent_id: { type: INTEGER, references: { model: 'categories', key: 'id' }, onDelete: 'SET NULL', allowNull: true },
      active: { type: BOOLEAN, defaultValue: true },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('categories');
  }
};
