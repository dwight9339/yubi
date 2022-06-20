export const fetchVariantsQuery = (variantIds) => {
  let qs = [];

  variantIds.forEach((variantId, i) => {
    qs.push(
      `
        variant${i}: productVariant(id: "gid://shopify/ProductVariant/${variantId}") {
          id
          title
          image {
            id
          }
          product {
            id
          }
          deleteAfterPurchase: privateMetafield(
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

export const deleteVariantWithImage = (variantId, productId, imageId) => {
  return `
    mutation {
      productVariantDelete(id: "${variantId}") {
        deletedProductVariantId
        userErrors {
          field
          message
        }
      }
      productDeleteImages(id: "${productId}", imageIds: ["${imageId}"]) {
        deletedImageIds
        userErrors {
          field
          message
        }
      }
    }
  `; 
}