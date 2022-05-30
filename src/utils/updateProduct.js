import { UPDATE_PRODUCT } from "../graphql/mutations/updateProduct";
import { UPDATE_PRODUCT_IMAGE } from "../graphql/mutations/updateProductImage";
import { CREATE_PRODUCT_IMAGE } from "../graphql/mutations/createProductImage";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";

export const updateProduct = () => {
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT);
  const [updateProductImageMutation] = useMutation(UPDATE_PRODUCT_IMAGE);
  const [createProductImageMutation] = useMutation(CREATE_PRODUCT_IMAGE);

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
      const tags = `unique variants, ${productTags || ""}`;
      const productUpdateResults = await updateProductMutation({
        variables: {
          input: {
            id: prevProduct.id,
            title: productTitle,
            descriptionHtml: productDescription,
            productType,
            tags
          }
        }
      });

      results = {
        productUpdateResults,
        ...results
      }
    }

    if (imageData) {
      const productImageUpdateResults = imageData.id
        ? await updateProductImageMutation({
            variables: {
              image: imageData,
              productId: prevProduct.id
            }
        })
        : await createProductImageMutation({
          variables: {
            input: {
              id: prevProduct.id,
              images: [imageData]
            }
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