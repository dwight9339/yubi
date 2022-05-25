import gql from "graphql-tag";

export const UPDATE_PRODUCT_IMAGE = gql`
  mutation UpdateProductImage($image: ImageInput!, $productId: ID!) {
    productImageUpdate(image: $image, productId: $productId) {
      userErrors {
        field
        message
      }
    }
  }
`;