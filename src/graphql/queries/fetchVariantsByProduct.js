import gql from "graphql-tag";

export const FETCH_VARIANTS_BY_PRODUCT = (productId) => {
  return gql`
    query FetchVariantsByProduct(
      $first: Int, 
      $last: Int, 
      $after: String, 
      $before: String
    ) {
      productVariants(
        first: $first,
        last: $last,
        after: $after,
        before: $before,
        query: "product_id:${productId}"
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
  `
};