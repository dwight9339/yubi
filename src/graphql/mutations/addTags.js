import gql from "graphql-tag";

export const ADD_TAGS = gql`
  mutation AddTags($resourceId: ID!, $tags: [String!]!) {
    tagsAdd(
      id: $resourceId,
      tags: $tags
    ) {
      node {
        __typename
        ... on Product {
          tags
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;