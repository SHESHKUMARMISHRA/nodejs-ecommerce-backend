// src/models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Load all models
const models = {
  User: require('./user'),
  Role: require('./role'),
  Vendor: require('./vendor'),
  Store: require('./store'),
  Product: require('./product'),
  Sku: require('./sku'),
  Category: require('./category'),
  Media: require('./media'),
  PersonalAccessToken: require('./personalAccessToken'),
  Inventory: require('./inventory'),
  Order: require('./order'),
  OrderItem: require('./orderItem'),
};

//  Initialize Models
for (const modelName of Object.keys(models)) {
  const model = models[modelName];
  if (typeof model.initModel === 'function') {
    model.initModel(sequelize);
  } else {
    console.warn(`⚠️ Model ${modelName} missing initModel()`);
  }
}

//  Run Associations (after init)
for (const modelName of Object.keys(sequelize.models)) {
  const model = sequelize.models[modelName];
  if (typeof model.associate === 'function') {
    model.associate(sequelize.models);
  }
}

module.exports = {
  sequelize,
  Sequelize,
  ...sequelize.models,  // auto-export all models
};
