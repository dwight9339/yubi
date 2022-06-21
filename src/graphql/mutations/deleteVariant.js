import gql from "graphql-tag";

export const DELETE_VARIANT = gql`
  mutation DeleteVariant($id: ID!) {
    productVariantDelete(id: $id) {
      deletedProductVariantId
      userErrors {
        field
        message
      }
    }
  }
`;

export const DELETE_VARIANT_AND_IMAGE = gql`
  mutation DeleteVariant(
    $variantId: ID!, 
    $productId: ID!,
    $imageId: ID!
  ) {
    productVariantDelete(id: $variantId) {
      deletedProductVariantId
      userErrors {
        message
      }
    }

    productDeleteImages(
      id: $productId,
      imageIds: [$imageId]
    ) {
      userErrors {
        message
      }
    }
  }
`