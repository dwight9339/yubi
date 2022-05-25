import { UPDATE_VARIANT } from "../graphql/mutations/updateVariant";
import { UPDATE_PRODUCT_IMAGE } from "../graphql/mutations/updateProductImage";
import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { METAFIELD_NAMESPACE, METAFIELD_KEY } from "../constants";
import { generateVariantGid } from "./gidHelper";

export const updateVariant = () => {
  const [updateVariantMutation] = useMutation(UPDATE_VARIANT);
  const [updateProductImageMutation] = useMutation(UPDATE_PRODUCT_IMAGE);

  return useCallback(async ({
    variantName,
    variantDescription,
    variantPrice,
    imageData,
    prevVariant
  }) => {
    console.log(`Variant name: ${variantName}`);
    console.log(`Variant description: ${variantDescription}`);
    console.log(`Variant price: ${variantPrice}`);
    console.log(`Image data: ${JSON.stringify(imageData)}`);
    console.log(`Prev variant: ${JSON.stringify(prevVariant)}`);
    let result = {};

    if (
      variantName !== prevVariant.name.value
      || variantDescription !== prevVariant.description.value
      || variantPrice !== prevVariant.price
    ) {
      const variantUpdateResults = await updateVariantMutation({
        variables: {
          input: {
            id: prevVariant.id,
            options: [variantName],
            metafields: [
              {
                id: prevVariant.description.id,
                value: variantDescription
              },
              {
                id: prevVariant.name.id,
                value: variantName
              },
            ],
            price: variantPrice
          }
        }
      });

      result.variantUpdateResults = variantUpdateResults;
    }

    if (imageData) {
      const productImageUpdateResults = await updateProductImageMutation({
        variables: {
          image: imageData,
          productId: prevVariant.product.id
        }
      });

      result.productImageUpdateResults = productImageUpdateResults;
    }

    console.log(`Update result: ${JSON.stringify(result)}`);

    return result;
  }, [updateProductImageMutation, updateVariantMutation]);
}