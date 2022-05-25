import gql from "graphql-tag";

export const UPDATE_VARIANT = gql`
  mutation UpdateVariant($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      userErrors {
        field
        message
      }
    }
  }
`;