import { DELETE_VARIANT } from "../../graphql/mutations/deleteVariant";
import { DELETE_PRODUCT_IMAGES } from "../../graphql/mutations/deleteProductImages";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";

export const deleteVariant = () => {
  const [deleteVariantMutation] = useMutation(DELETE_VARIANT);
  const [deleteProductImagesMutation] = useMutation(DELETE_PRODUCT_IMAGES);

  return useCallback(async (variant) => {
    let results = {};

    if (variant.image) {
      const imageDeleteResults = await deleteProductImagesMutation({
        variables: {
          productId: variant.product.id,
          imageIds: [variant.image.id]
        }
      });

      results = {
        imageDeleteResults,
        ...results
      };
    }


    const variantDeleteResults = await deleteVariantMutation({
      variables: {
        id: variant.id
      }
    });

    results = {
      variantDeleteResults,
      ...results
    };

    return results;
  }, [deleteVariantMutation, deleteProductImagesMutation]);
};