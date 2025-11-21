// migrations/001_create_users.js
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, BOOLEAN, DATE } = Sequelize.DataTypes;

    await queryInterface.createTable(
      'users',
      {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        uuid: { type: STRING, unique: true },
        name: { type: STRING },
        email: { type: STRING, unique: true },
        password: { type: STRING },
        phone: { type: STRING, allowNull: true },
        is_vendor: { type: BOOLEAN, defaultValue: false },
        email_verified_at: { type: DATE, allowNull: true },
        last_login_at: { type: DATE, allowNull: true },
        createdAt: { type: DATE, allowNull: false },
        updatedAt: { type: DATE, allowNull: false },
        deletedAt: { type: DATE, allowNull: true }
      },
      {
        paranoid: true
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};
