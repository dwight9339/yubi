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
    imageData,
    prevVariant,
    productId
  }) => {
    try {
      let newImage;

      if (imageData) {
        const imageUpdateResults = imageData.id
          ? await updateProductImageMutation({
            variables: {
              image: imageData,
              productId
            }
          })
          : await createProductImageMutation({
            variables: {
              input: {
                id: productId,
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

      if (!prevVariant) {
        const variantCreateResults = await createVariantMutation({
          variables: {
            variantInput: {
              options: [variantName],
              price: variantPrice,
              productId,
              imageId: newImage?.id,
              metafields: [
                {
                  description: "Description for unique variant",
                  type: "multi_line_text_field",
                  namespace: METAFIELD_NAMESPACE.variants,
                  key: METAFIELD_KEY.variantDescription,
                  value: variantDescription
                },
                {
                  type: "boolean",
                  description: "Marks variant as unique variant",
                  namespace: METAFIELD_NAMESPACE.variants,
                  key: METAFIELD_KEY.isUniqueVariant,
                  value: "true"
                },
              ],
            }
          }
        });

        const { data: { productVariantCreate } } = variantCreateResults;
        
        if (productVariantCreate.userErrors?.length) {
          throw(extractUserErrors(productVariantCreate));
        }

        return productVariantCreate.productVariant;
      } else if (
        variantName !== prevVariant.name?.value
        || variantDescription !== prevVariant.description?.value
        || variantPrice !== prevVariant?.price
        || newImage
      ) {

        const variantUpdateResults = await updateVariantMutation({
          variables: {
            input: {
              id: prevVariant.id,
              options: [variantName],
              imageId: newImage?.id,
              metafields: [
                {
                  type: "multi_line_text_field",
                  description: "Unique variant description",
                  namespace: METAFIELD_NAMESPACE.variants,
                  key: METAFIELD_KEY.variantDescription,
                  id: prevVariant.description?.id,
                  value: variantDescription
                }
              ],
              price: variantPrice
            }
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
      throw([`${err}`]);
    }
  }, []);
}