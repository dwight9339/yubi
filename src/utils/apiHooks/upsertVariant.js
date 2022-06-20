import { UPDATE_VARIANT } from "../../graphql/mutations/updateVariant";
import { UPDATE_PRODUCT_IMAGE } from "../../graphql/mutations/updateProductImage";
import { CREATE_PRODUCT_IMAGE } from "../../graphql/mutations/createProductImage";
import { CREATE_VARIANT } from "../../graphql/mutations/createVariant";
import { METAFIELD_NAMESPACE, METAFIELD_KEY } from "../../constants";
import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { extractUserErrors } from "../errorHelper";

export const upsertVariant = () => {
  const [updateVariantMutation] = useMutation(UPDATE_VARIANT);
  const [createVariantMutation] = useMutation(CREATE_VARIANT);
  const [updateProductImageMutation] = useMutation(UPDATE_PRODUCT_IMAGE);
  const [createProductImageMutation] = useMutation(CREATE_PRODUCT_IMAGE);

  return useCallback(async ({
    variantName,
    variantDescription,
    variantPrice,
    deleteAfterPurchase,
    imageData,
    prevVariant,
    product
  }) => {
    try {
      // If product only has a default variant, update that instead of creating a new one
      if (product?.hasOnlyDefaultVariant) { 
        prevVariant = product.variants.edges[0].node;
      }
      let newImage;

      if (imageData) {
        const imageUpdateResults = imageData.id
          ? await updateProductImageMutation({
            variables: {
              image: imageData,
              productId: product.id
            }
          })
          : await createProductImageMutation({
            variables: {
              input: {
                id: product.id,
                images: [imageData]
              }
            }
          });

        const { data: { productImageUpdate, productAppendImages } } = imageUpdateResults;

        if (productImageUpdate?.userErrors?.length) {
          throw(extractUserErrors(productImageUpdate));
        } else if (productAppendImages?.userErrors?.length) {
          throw(extractUserErrors(productAppendImages));
        }

        newImage = productAppendImages?.newImages?.at(0);
      }

      const variantInput = {
        id: prevVariant?.id,
        options: [variantName],
        price: variantPrice,
        imageId: newImage?.id,
        metafields: [
          {
            id: prevVariant?.description?.id,
            description: "Description for unique variant",
            type: "multi_line_text_field",
            namespace: METAFIELD_NAMESPACE.variants,
            key: METAFIELD_KEY.variantDescription,
            value: variantDescription
          }
        ],
        privateMetafields: [
          {
            namespace: METAFIELD_NAMESPACE.variants,
            key: METAFIELD_KEY.deleteAfterPurchase,
            valueInput: {
              value: `${deleteAfterPurchase}`,
              valueType: "STRING"
            }
          }
        ]
      }

      if (!prevVariant) {
        variantInput.productId = product.id;
        const variantCreateResults = await createVariantMutation({
          variables: {
            variantInput
          }
        });

        const { data: { productVariantCreate } } = variantCreateResults;
        
        if (productVariantCreate.userErrors?.length) {
          throw(extractUserErrors(productVariantCreate));
        }

        return productVariantCreate.productVariant;
      } else if (
        product?.hasOnlyDefaultVariant
        || variantName !== prevVariant?.name?.value
        || variantDescription !== prevVariant?.description?.value
        || variantPrice !== prevVariant?.price
        || newImage
      ) {

        const variantUpdateResults = await updateVariantMutation({
          variables: {
            input: variantInput
          }
        });

        const { data: { productVariantUpdate } } = variantUpdateResults;

        if (productVariantUpdate.userErrors?.length) {
          throw(extractUserErrors(productVariantUpdate));
        }

        return productVariantUpdate.productVariant;
      } 
    } catch(err) {
      if (Array.isArray(err)) {
        throw err;
      }
      throw([`${err.message || err}`]);
    }
  }, []);
}