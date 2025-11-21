module.exports = function skuResource(sku) {
  if (!sku) return null;
  return {
    id: sku.id,
    sku: sku.sku,
    price: sku.price,
    inventory_quantity: sku.inventory_quantity,
    attributes: sku.attributes
  };
};
