// migrations/003_create_vendors.js
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, ENUM, DECIMAL, DATE } = Sequelize;
    await queryInterface.createTable('vendors', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      company_name: { type: STRING },
      slug: { type: STRING, unique: true, allowNull: true },
      status: { type: ENUM('pending','active','suspended','closed'), defaultValue: 'pending' },
      rating: { type: DECIMAL(3,2), defaultValue: 0 },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: { type: DATE, allowNull: true }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('vendors');
  }
};
