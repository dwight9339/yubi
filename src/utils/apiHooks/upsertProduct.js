import { UPDATE_PRODUCT } from "../../graphql/mutations/updateProduct";
import { CREATE_PRODUCT } from "../../graphql/mutations/createProduct";
import { UPDATE_PRODUCT_IMAGE } from "../../graphql/mutations/updateProductImage";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { handleUserErrors } from "../errorHelper";
import { UV_TAG } from "../../constants";

export const upsertProduct = () => {
  const [createProductMutation] = useMutation(CREATE_PRODUCT);
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
    const tags = `unique variants, ${productTags || ""}`;
    const productInput = {
      id: prevProduct?.id,
      title: productTitle,
      descriptionHtml: productDescription,
      productType,
      tags,
      images: imageData && !imageData.id ? [imageData] : null
    };
    let result;
    if (prevProduct?.featuredImage && imageData) { // If updating existing product image
      await updateProductImageMutation({
        variables: {
          productId: prevProduct.id,
          image: imageData
        },
        onCompleted: handleUserErrors
      });
    } 
    if (!prevProduct) {
      await createProductMutation({
        variables: {
          input: productInput
        },
        onCompleted: (data) => {
          handleUserErrors(data);

          result = data.productCreate.product
        }
      });
    } else if (
      productTitle !== prevProduct.title
      || productDescription !== prevProduct.description
      || productType !== prevProduct.productType
      || productTags !== prevProduct.tags
    ) {
      await updateProductMutation({
        variables: {
          input: productInput
        },
        onCompleted: (data) => {
          handleUserErrors(data);

          result = data.productUpdate.product
        }
      });
    }

    return result;
  }); 
}