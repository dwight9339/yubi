export const getIdFromGid = (gid) => {
  return gid.split("/").pop();
};

const generateGid = (entityType, id) => {
  return `gid://shopify/${entityType}/${id}`
};

export const generateVariantGid = (id) => {
  return generateGid("ProductVariant", id);
};

export const generateProductGid = (id) => {
  return generateGid("Product", id);
}