// migrations/009_create_personal_access_tokens.js
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, TEXT, DATE } = Sequelize;
    await queryInterface.createTable('personal_access_tokens', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      tokenable_type: { type: STRING },
      tokenable_id: { type: INTEGER },
      name: { type: STRING },
      token: { type: STRING(64), unique: true },
      abilities: { type: TEXT, allowNull: true },
      last_used_at: { type: DATE, allowNull: true },
      expires_at: { type: DATE, allowNull: true },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('personal_access_tokens');
  }
};
