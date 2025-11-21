const SkuResource = require('./skuResource');
const VendorResource = require('./vendorResource');

module.exports = function productResource(product) {
  if (!product) return null;
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    short_description: product.short_description,
    description: product.description,
    skus: Array.isArray(product.skus) ? product.skus.map(SkuResource) : [],
    vendor: product.vendor ? VendorResource(product.vendor) : null,
    meta: product.meta,
    created_at: product.createdAt
  };
};
