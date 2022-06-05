export const fetchVariantsQuery = (variantIds) => {
  let qs = [];

  variantIds.forEach((variantId, i) => {
    qs.push(
      `
        variant${i}: productVariant(id: "gid://shopify/ProductVariant/${variantId}") {
          id
          title
          isUv: metafield(
            namespace: "uvapp-variants",
            key: "is_uv"
          ) {
            value
          }
        }
      `
    );
  });

  return "{".concat(...qs, "}");
}

export const deleteVariantQuery = (variantId) => {
  return `
    mutation {
      productVariantDelete(id: "${variantId}") {
        deletedProductVariantId
        userErrors {
          field
          message
        }
      }
    }
  `;
}