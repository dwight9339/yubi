import gql from "graphql-tag";

export const FETCH_PRODUCTS = gql`
  query FetchProducts(
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String) {
    products(
      first: $first
      last: $last
      query: "tag:'unique variants'"
      sortKey: UPDATED_AT
      after: $endCursor
      before: $startCursor
    ) {
      edges {
        node {
          id
          title
          featuredImage {
            url
            altText
          }
          totalVariants
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
`;