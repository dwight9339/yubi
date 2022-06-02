import gql from "graphql-tag";

export const DELETE_VARIANTS = gql`
  mutation DeleteVariants($productId: ID!, $variantsIds: [ID!]!) {
    productVariantsBulkDelete(
      productId: $productId,
      variantsIds: $variantsIds
    ) {
      product {
        id
        hasOnlyDefaultVariant
      }
      userErrors {
        field
        message
      }
    }
  }
`;