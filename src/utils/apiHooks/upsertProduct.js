import { UPDATE_PRODUCT } from "../../graphql/mutations/updateProduct";
import { CREATE_PRODUCT } from "../../graphql/mutations/createProduct";
import { UPDATE_PRODUCT_IMAGE } from "../../graphql/mutations/updateProductImage";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { extractUserErrors } from "../errorHelper";

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
    try {
      const tags = `unique variants, ${productTags || ""}`;
      const productInput = {
        id: prevProduct?.id,
        title: productTitle,
        descriptionHtml: productDescription,
        productType,
        tags,
        images: imageData && !imageData.id ? [imageData] : null,
        templateSuffix: "unique-variants"
      };
      let results;
      
      if (prevProduct?.featuredImage && imageData) { // If updating existing product image
        const imageUpdateResults = await updateProductImageMutation({
          variables: {
            productId: prevProduct.id,
            image: imageData
          }
        });
        const { data: { productImageUpdate } } = imageUpdateResults;
        
        if (productImageUpdate.userErrors.length) {
          throw extractUserErrors(productImageUpdate);
        }
      } 
      if (!prevProduct) {
        const productCreateResults = createProductMutation({
          variables: {
            input: productInput
          }
        });

        results = (await productCreateResults).data.productCreate;
      } else if (
        productTitle !== prevProduct.title
        || productDescription !== prevProduct.description
        || productType !== prevProduct.productType
        || productTags !== prevProduct.tags
      ) {
        const productUpdateResults = await updateProductMutation({
          variables: {
            input: productInput
          }
        });

        results = productUpdateResults.data.productUpdate;
      }

      const { product, userErrors } = results;

      if (userErrors.length) {
        throw userErrors.map((error) => error.message);
      }

      return product;
    } catch(err) {
      if (Array.isArray(err)) {
        throw err;
      }
      throw([`${err.message || err}`]);
    }
  }, []); 
}