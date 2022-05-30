import gql from "graphql-tag";

export const CREATE_PRODUCT_IMAGE = gql`
  mutation CreateVariant($imageInput: ProductAppendImagesInput!) {
    productAppendImages(input: $imageInput) {
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