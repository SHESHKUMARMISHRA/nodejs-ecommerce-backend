// scripts/migrate.js
const fs = require('fs');
const path = require('path');
const { sequelize, Sequelize } = require('../models');  // ⬅️ import Sequelize class

async function run() {
  console.log("DB connected");

  const migrationsDir = path.join(__dirname, '../migrations');
  const files = fs.readdirSync(migrationsDir);

  for (const file of files) {
    const migration = require(path.join(migrationsDir, file));
    console.log("Running migration", file);

    try {
      await migration.up(sequelize.getQueryInterface(), Sequelize);
    } catch (err) {
      console.error("Migration failed", err);
      process.exit(1);
    }
  }

  process.exit(0);
}

run();
