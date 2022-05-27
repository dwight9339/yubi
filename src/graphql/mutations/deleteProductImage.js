import gql from "graphql-tag";

export const DELETE_PRODUCT_IMAGE = gql`
  mutation DeleteProductImage($productId: ID!, $imageId: ID!) {
    productDeleteImages(id: $productId, imageIds: [$imageId]) {
      deletedImageIds
      userErrors {
        field
        message
      }
    }
  }
`;