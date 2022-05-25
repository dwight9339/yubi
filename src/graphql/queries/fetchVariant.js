import gql from "graphql-tag";

export const FETCH_VARIANT = gql`
  query FetchVariant($id: ID!) {
    productVariant(id: $id) {
      id
      title
      image {
        id
        url
        altText
      }
      name: metafield(
        namespace: "uvapp-variants",
        key: "variant_name"
      ) {
        id
        value
      }
      description: metafield(
        namespace: "uvapp-variants",
        key: "variant_description"
      ) {
        id
        value
      }
      price
      product {
        id
      }
    }
  }
`;