import gql from "graphql-tag";
import { 
  METAFIELD_KEY,
  METAFIELD_NAMESPACE,
  UV_TAG,
  UV_TEMPLATE_SUFFIX
} from "../../constants";

export const CONVERT_PRODUCT = gql`
  mutation ConvertProduct(
    $productId: ID!,
    $variantsIds: [ID!]!
  ) {
    productVariantsBulkDelete(productId: $productId, variantsIds: $variantsIds) {
      userErrors {
        field
        message
      }
    }
    tagsAdd(id: $productId, tags: ["${UV_TAG}"]) {
      userErrors {
        field
        message
      }
    }
    productUpdate(input: {
      id: $productId,
      templateSuffix: "${UV_TEMPLATE_SUFFIX}",
    }) {
      userErrors {
        field
        message
      }
    }
  }
`;