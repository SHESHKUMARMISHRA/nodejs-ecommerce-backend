// src/controllers/productController.js
const { Product, Sku, Vendor } = require('../models');

module.exports = {
  async index(req, res) {
    const { q, vendor_id, status, per_page = 15, page = 1 } = req.query;
    const where = {};
    if (q) {
      where[Op.or] = [
        { name: { [Op.like]: `%${q}%` } },
        { description: { [Op.like]: `%${q}%` } },
        { short_description: { [Op.like]: `%${q}%` } }
      ];
    }
    if (vendor_id) where.vendor_id = vendor_id;
    if (status) where.status = status;

    const limit = parseInt(per_page,10);
    const offset = (parseInt(page,10)-1)*limit;

    const { rows, count } = await Product.findAndCountAll({
      where,
      include: [{ model: Sku, as: 'skus' }, { model: Vendor, as: 'vendor' }],
      limit,
      offset,
      order: [['createdAt','DESC']]
    });

    return res.json({
      data: rows.map(p => ({
        id: p.id, name: p.name, slug: p.slug,
        short_description: p.short_description,
        description: p.description,
        skus: p.skus,
        vendor: p.vendor,
        meta: p.meta,
        created_at: p.createdAt
      })),
      meta: { total: count, per_page: limit, current_page: parseInt(page,10), last_page: Math.ceil(count/limit) }
    });
  },

  async show(req,res) {
    const p = await Product.findByPk(req.params.id, { include: ['skus','vendor'] });
    if (!p) return res.status(404).json({ message: 'Not found' });
    return res.json({ data: p });
  },

  async store(req,res) {
    const data = req.body;
    const product = await Product.create(data);
    const loaded = await Product.findByPk(product.id, { include: ['skus','vendor'] });
    return res.json(loaded);
  },

  async update(req,res) {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    await p.update(req.body);
    const loaded = await Product.findByPk(p.id, { include: ['skus','vendor'] });
    return res.json(loaded);
  },

  async destroy(req,res) {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    await p.destroy();
    return res.status(204).send();
  }
};
