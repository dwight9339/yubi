import gql from "graphql-tag";

export const CREATE_VARIANT = gql`
  mutation CreateVariant($variantInput: ProductVariantInput!) {
    productVariantCreate(input: $variantInput) {
      productVariant {
        id
        title
      }
      userErrors {
        field
        message
      }
    }
  }
`;