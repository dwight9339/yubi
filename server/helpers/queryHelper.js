export const fetchVariantsQuery = (variantIds) => {
  let qs = [];

  variantIds.forEach((variantId, i) => {
    qs.push(
      `
        variant${i}: productVariant(id: "gid://shopify/ProductVariant/${variantId}") {
          id
          title
          description: metafield(
            namespace: "uvapp-variants",
            key: "variant_description"
          ) {
            value
          }
          image {
            id
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
        userErrors {
          field
          message
        }
      }
    }
  `;
}