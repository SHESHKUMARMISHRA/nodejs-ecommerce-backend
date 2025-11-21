const { Product, Sku, Vendor } = require('../models');
const { Op } = require('sequelize');

class CatalogService {
  async paginateProducts(filters = {}, perPage = 15, page = 1) {
    const where = {};

    if (filters.q) {
      where[Op.or] = [
        { name: { [Op.like]: `%${filters.q}%` } },
        { description: { [Op.like]: `%${filters.q}%` } },
        { short_description: { [Op.like]: `%${filters.q}%` } }
      ];
    }

    if (filters.vendor_id) where.vendor_id = filters.vendor_id;
    if (filters.status) where.status = filters.status;

    const limit = parseInt(perPage, 10) || 15;
    const offset = (parseInt(page, 10) - 1) * limit;

    const { rows, count } = await Product.findAndCountAll({
      where,
      include: [
        { model: Sku, as: 'skus' },
        { model: Vendor, as: 'vendor' }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      data: rows,
      meta: {
        total: count,
        per_page: limit,
        current_page: parseInt(page, 10),
        last_page: Math.ceil(count / limit)
      }
    };
  }

  async createProduct(data) {
    const product = await Product.create(data);
    return product;
  }

  async findProduct(id) {
    const product = await Product.findByPk(id, {
      include: [
        { model: Sku, as: 'skus' },
        { model: Vendor, as: 'vendor' }
      ]
    });
    return product;
  }

  async updateProduct(id, data) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    await product.update(data);
    return this.findProduct(id);
  }
}

module.exports = new CatalogService();
