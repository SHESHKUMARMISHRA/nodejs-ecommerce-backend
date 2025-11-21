// scripts/seed.js
require('dotenv').config();
const path = require('path');
const { sequelize, User, Role, Vendor, Store, Product, Sku } = require(path.resolve(__dirname, '../models'));
const { v4: uuidv4 } = require('uuid');

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('DB connected for seeding');

    // simple truncate-like cleanup for dev
    await sequelize.sync({ force: true });

    // create roles
    const adminRole = await Role.findOrCreate({ where: { name: 'admin' }, defaults: { guard_name: 'web' } });
    const vendorRole = await Role.findOrCreate({ where: { name: 'vendor' }, defaults: { guard_name: 'web' } });

    // users
   
    const admin = await User.create({
      uuid: uuidv4(),
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password',
      is_vendor: false
    });

    const vendorUser = await User.create({
      uuid: uuidv4(),
      name: 'Vendor Owner',
      email: 'vendor@example.com',
      password: 'password',
      is_vendor: true
    });

    await admin.addRole(await Role.findOne({ where: { name: 'admin' } }));
    await vendorUser.addRole(await Role.findOne({ where: { name: 'vendor' } }));

    // vendor & store
    const vendor = await Vendor.create({
      user_id: vendorUser.id,
      company_name: 'ACME Supplies',
      slug: 'acme-supplies',
      status: 'active',
      rating: 4.8
    });

    const store = await Store.create({
      vendor_id: vendor.id,
      name: 'ACME Main Store',
      domain: null,
      is_default: true
    });

    // products + skus
    for (let i = 1; i <= 5; i++) {
      const p = await Product.create({
        vendor_id: vendor.id,
        store_id: store.id,
        name: `Sample Product ${i}`,
        slug: `sample-product-${i}`,
        short_description: `Short desc ${i}`,
        description: `Long description ${i}`,
        type: 'simple',
        status: 'published',
        featured: false,
        meta: { color: 'red' }
      });

      await Sku.create({
        product_id: p.id,
        sku: `SKU${Math.random().toString(36).slice(2,8).toUpperCase()}`,
        price: 100 * i,
        compare_at_price: null,
        inventory_quantity: 50,
        inventory_policy: 'deny',
        attributes: { size: 'M' },
        active: true
      });
    }

    console.log('Seeding complete. Admin: admin@example.com / password');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
