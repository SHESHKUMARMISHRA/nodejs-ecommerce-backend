module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, ENUM } = Sequelize;

    await queryInterface.createTable("skus", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      product_id: { type: INTEGER, allowNull: false },
      sku: { type: STRING, allowNull: false, unique: true },
      price: { type: Sequelize.DECIMAL(12, 2) },
      compare_at_price: { type: Sequelize.DECIMAL(12, 2) },
      inventory_quantity: { type: INTEGER, defaultValue: 0 },
      inventory_policy: {
        type: ENUM("deny", "continue"),
        defaultValue: "deny",
      },
      attributes: { type: Sequelize.JSON },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: { type: DATE },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("skus");
  },
};
