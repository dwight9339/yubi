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
        url
        altText
      }
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
              url
              altText
            }
            price
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