import { gql } from "graphql-tag";

export const FETCH_PRODUCT = gql`
  query FetchProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
      featuredImage {
        id
        url
        altText
      }
      productType
      tags
      hasOnlyDefaultVariant
      options {
        name
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;