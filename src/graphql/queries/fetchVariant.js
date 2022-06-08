import gql from "graphql-tag";
import { METAFIELD_NAMESPACE, METAFIELD_KEY } from "../../constants";

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
      description: metafield(
        namespace: "${METAFIELD_NAMESPACE.variants}",
        key: "${METAFIELD_KEY.variantDescription}"
      ) {
        id
        value
      }
      isUv: metafield(
        namespace: "${METAFIELD_NAMESPACE.variants}",
        key: "${METAFIELD_KEY.isUniqueVariant}"
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