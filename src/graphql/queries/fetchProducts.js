import gql from "graphql-tag";

/* Grabs the first page of products */
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
          variants(first: 5) {
            edges {
              node {
                id
                image {
                  url
                }
                price
                name: metafield(
                  namespace: "uvapp-variants",
                  key: "variant_name"
                ) {
                  value
                }
                description: metafield(
                  namespace: "uvapp-variants",
                  key: "variant_description"
                ) {
                  value
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