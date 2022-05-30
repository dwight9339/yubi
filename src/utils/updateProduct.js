import { UPDATE_PRODUCT } from "../graphql/mutations/updateProduct";
import { UPDATE_PRODUCT_IMAGE } from "../graphql/mutations/updateProductImage";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";

export const updateProduct = () => {
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT);
  const [updateProductImageMutation] = useMutation(UPDATE_PRODUCT_IMAGE);

  return useCallback(async ({
    productTitle,
    productDescription,
    productType,
    productTags,
    imageData,
    prevProduct
  }) => {
    let results = {};

    if (
      productTitle !== prevProduct.title
      || productDescription !== prevProduct.description
      || productType !== prevProduct.productType
      || productTags !== prevProduct.tags
    ) {
      const productUpdateResults = await updateProductMutation({
        variables: {
          input: {
            id: prevProduct.id,
            title: productTitle,
            descriptionHtml: productDescription,
            productType,
            tags: productTags
          }
        }
      });

      results = {
        productUpdateResults,
        ...results
      }
    }

    if (imageData) {
      const productImageUpdateResults = await updateProductImageMutation({
        variables: {
          image: imageData,
          productId: prevProduct.id
        }
      });

      results = {
        productImageUpdateResults,
        ...results
      };
    }

    return results;
  }, [updateProductMutation, updateProductImageMutation]); 
}