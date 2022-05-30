import gql from "graphql-tag";

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: ProductInput!) {
    productUpdate(input: $input) {
      userErrors {
        field
        message
      }
    }
  }
`;