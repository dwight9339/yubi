export const fetchVariantsQuery = (variantIds) => {
  let qs = [];

  variantIds.forEach((variantId, i) => {
    qs.push(
      `
        variant${i}: productVariant(id: "gid://shopify/ProductVariant/${variantId}") {
          id
          title
          deleteAfterPurchase: metafield(
            namespace: "uvapp-variants",
            key: "delete_after_purchase"
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