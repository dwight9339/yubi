import { DELETE_VARIANT } from "../graphql/mutations/deleteVariant";
import { DELETE_PRODUCT_IMAGE } from "../graphql/mutations/deleteProductImage";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";

export const deleteVariant = () => {
  const [deleteVariantMutation] = useMutation(DELETE_VARIANT);
  const [deleteProductImageMutation] = useMutation(DELETE_PRODUCT_IMAGE);

  return useCallback(async (variant) => {
    let results = {};

    if (variant.image) {
      const imageDeleteResults = await deleteProductImageMutation({
        variables: {
          productId: variant.product.id,
          imageId: variant.image.id
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
  }, [deleteVariantMutation, deleteProductImageMutation]);
};