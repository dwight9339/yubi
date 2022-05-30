import gql from "graphql-tag";

export const CREATE_VARIANT = gql`
  mutation CreateVariant($variantInput: ProductVariantInput!) {
    productVariantCreate(input: $variantInput) {
      userErrors {
        field
        message
      }
    }
  }
`;