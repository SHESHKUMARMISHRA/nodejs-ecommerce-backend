module.exports = function vendorResource(v) {
  if (!v) return null;
  return {
    id: v.id,
    name: v.store_name || v.name,
    slug: v.slug || null,
    email: v.business_email,
    phone: v.business_phone
  };
};
