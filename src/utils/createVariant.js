import { CREATE_VARIANT } from "../graphql/mutations/createVariant";
import { CREATE_PRODUCT_IMAGE } from "../graphql/mutations/createProductImage";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { METAFIELD_NAMESPACE, METAFIELD_KEY } from "../constants";

export const createVariant = () => {
  const [createVariantMutation] = useMutation(CREATE_VARIANT);
  const [createProductImageMutation] = useMutation(CREATE_PRODUCT_IMAGE);

  return useCallback(
    async ({
      variantName,
      variantDescription,
      variantPrice,
      imageData,
      productId
    }) => {
      const results = {};

      if (imageData) {
        const imageAppendResults = await createProductImageMutation({
          variables: {
            input: {
              id: productId,
              images: [imageData]
            }
          }
        });

        results.imageAppendResults = imageAppendResults?.data.productAppendImages;
      }
      
      const variantCreateResults = await createVariantMutation({
        variables: {
          variantInput: {
            options: [variantName],
            price: variantPrice,
            productId,
            imageId: results.imageAppendResults?.newImages?.pop().id,
            metafields: [
              {
                type: "multi_line_text_field",
                namespace: METAFIELD_NAMESPACE.variants,
                key: METAFIELD_KEY.variantDescription,
                value: variantDescription
              },
              {
                type: "single_line_text_field",
                namespace: METAFIELD_NAMESPACE.variants,
                key: METAFIELD_KEY.variantName,
                value: variantName
              },
            ],
          }
        }
      });
      
      results.variantCreateResults = variantCreateResults?.data.productVariantCreate;

      return results;
    }
  )
}