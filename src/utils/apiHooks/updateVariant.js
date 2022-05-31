import { UPDATE_VARIANT } from "../graphql/mutations/updateVariant";
import { UPDATE_PRODUCT_IMAGE } from "../graphql/mutations/updateProductImage";
import { CREATE_PRODUCT_IMAGE } from "../graphql/mutations/createProductImage";
import { METAFIELD_NAMESPACE, METAFIELD_KEY } from "../constants";
import { useCallback } from "react";
import { useMutation } from "@apollo/client";

export const updateVariant = () => {
  const [updateVariantMutation] = useMutation(UPDATE_VARIANT);
  const [updateProductImageMutation] = useMutation(UPDATE_PRODUCT_IMAGE);
  const [createProductImageMutation] = useMutation(CREATE_PRODUCT_IMAGE);

  return useCallback(async ({
    variantName,
    variantDescription,
    variantPrice,
    imageData,
    prevVariant
  }) => {
    let results = {};

    if (imageData) {
      const imageUpdateResults = imageData.id
        ? await updateProductImageMutation({
          variables: {
            image: imageData,
            productId: prevVariant.product.id
          }
        })
        : await createProductImageMutation({
          variables: {
            input: {
              id: prevVariant.product.id,
              images: [imageData]
            }
          }
        });

      results = {
        imageUpdateResults,
        ...results
      };
    }

    if (
      variantName !== prevVariant.name?.value
      || variantDescription !== prevVariant.description?.value
      || variantPrice !== prevVariant?.price
      || results.imageUpdateResults?.data?.productAppendImages
    ) {
      const newImages = results.imageUpdateResults?.data?.productAppendImages?.newImages;
      const imageId = newImages ? newImages[0].id : null;

      const variantUpdateResults = await updateVariantMutation({
        variables: {
          input: {
            id: prevVariant.id,
            options: [variantName],
            imageId,
            metafields: [
              {
                description: "Unique variant description",
                namespace: METAFIELD_NAMESPACE.variants,
                key: METAFIELD_KEY.variantDescription,
                id: prevVariant.description?.id,
                value: variantDescription
              },
              {
                description: "Unique variant name",
                namespace: METAFIELD_NAMESPACE.variants,
                key: METAFIELD_KEY.variantName,
                id: prevVariant.name?.id,
                value: variantName
              },
            ],
            price: variantPrice
          }
        }
      });

      results = {
        variantUpdateResults,
        ...results
      };
    }

    return results;
  }, [updateProductImageMutation, updateVariantMutation]);
}