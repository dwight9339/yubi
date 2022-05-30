import gql from "graphql-tag";

export const CREATE_PRODUCT_IMAGE = gql`
  mutation CreateProductImage($input: ProductAppendImagesInput!) {
    productAppendImages(input: $input) {
      newImages {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;