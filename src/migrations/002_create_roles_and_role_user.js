// migrations/002_create_roles_and_role_user.js
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('roles', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING, unique: true },
      guard_name: { type: STRING, defaultValue: 'web' },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false }
    });
    await queryInterface.createTable('role_user', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      role_id: { type: INTEGER, references: { model: 'roles', key: 'id' }, onDelete: 'CASCADE' },
      user_id: { type: INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('role_user');
    await queryInterface.dropTable('roles');
  }
};
