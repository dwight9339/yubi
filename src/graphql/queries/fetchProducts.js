import gql from "graphql-tag";
import { QUERY_PAGE_SIZE } from "../../constants";

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
          hasOnlyDefaultVariant
          variants(first: ${QUERY_PAGE_SIZE.variantsPreview}) {
            edges {
              node {
                id
                title
                image {
                  url
                  altText
                }
              }
            }
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
`;