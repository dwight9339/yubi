import { gql } from "graphql-tag";

export const FETCH_PRODUCT = gql`
  query FetchProduct(
    $id: ID!
    $variants_first: Int
    $variants_last: Int
    $variants_start_cursor: String
    $variants_end_cursor: String
  ) {
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
      variants(
        first: $variants_first
        last: $variants_last
        after: $variants_end_cursor
        before: $variants_start_cursor
      ) {
        edges {
          node {
            id
            title
            image {
              id
              url
              altText
            }
            price
            product {
              id
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;