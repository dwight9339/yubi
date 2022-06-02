import gql from "graphql-tag";

export const DELETE_PRODUCT_IMAGES = gql`
  mutation DeleteProductImage($productId: ID!, $imageIds: [ID!]!) {
    productDeleteImages(id: $productId, imageIds: $imageIds) {
      deletedImageIds
      userErrors {
        field
        message
      }
    }
  }
`;