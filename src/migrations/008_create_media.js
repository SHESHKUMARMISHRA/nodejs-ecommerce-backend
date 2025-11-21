// migrations/008_create_media.js
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, UUID, STRING, TEXT, DATE, JSON } = Sequelize;
    await queryInterface.createTable('media', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      uuid: { type: STRING, unique: true },
      vendor_id: { type: INTEGER, references: { model: 'vendors', key: 'id' }, onDelete: 'SET NULL', allowNull: true },
      filename: { type: STRING },
      path: { type: STRING },
      disk: { type: STRING, defaultValue: 's3' },
      mime: { type: STRING, allowNull: true },
      size: { type: INTEGER, allowNull: true },
      meta: { type: JSON, allowNull: true },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('media');
  }
};
