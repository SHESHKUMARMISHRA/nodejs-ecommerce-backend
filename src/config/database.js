const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const dialect = process.env.DB_DIALECT || 'sqlite';
const storage = process.env.DB_STORAGE || path.join(__dirname, '../database/database.sqlite');

// Ensure database folder exists
const dir = path.dirname(storage);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const sequelize = new Sequelize({
  dialect,
  storage,
  logging: console.log  // Show SQL queries
});

module.exports = sequelize;
