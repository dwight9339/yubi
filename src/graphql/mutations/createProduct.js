import gql from "graphql-tag";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;