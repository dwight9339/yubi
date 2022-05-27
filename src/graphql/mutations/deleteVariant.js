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