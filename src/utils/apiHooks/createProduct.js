import { CREATE_PRODUCT } from "../../graphql/mutations/createProduct";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { METAFIELD_NAMESPACE, METAFIELD_KEY } from "../../constants";

export const createProduct = () => {
  const [createProductMutation] = useMutation(CREATE_PRODUCT);

  return useCallback(async ({
    productTitle,
    productDescription,
    productType,
    productTags,
    imageData
  }) => {
    const tags = `unique variants, ${productTags || ""}`;

    const results = createProductMutation({
      variables: {
        input: {
          title: productTitle,
          descriptionHtml: productDescription,
          productType,
          tags,
          images: imageData ? [imageData] : null,
          metafields: [
            {
              namespace: METAFIELD_NAMESPACE.products,
              key: METAFIELD_KEY.isUniqueVariantsProduct,
              description: "Marks product as a unique variants product",
              type: "boolean",
              value: "true"
            }
          ]
        }
      }
    });

    return results;
  }, [createProductMutation]);
};