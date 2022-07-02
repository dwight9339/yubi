import { UPDATE_VARIANT } from "../../graphql/mutations/updateVariant";
import { UPDATE_PRODUCT_IMAGE } from "../../graphql/mutations/updateProductImage";
import { CREATE_PRODUCT_IMAGE } from "../../graphql/mutations/createProductImage";
import { CREATE_VARIANT } from "../../graphql/mutations/createVariant";
import { METAFIELD_NAMESPACE, METAFIELD_KEY } from "../../constants";
import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { handleUserErrors } from "../errorHelper";

export const upsertVariant = () => {
  const [updateVariant] = useMutation(UPDATE_VARIANT);
  const [createVariant] = useMutation(CREATE_VARIANT);
  const [updateProductImage] = useMutation(UPDATE_PRODUCT_IMAGE);
  const [createProductImage] = useMutation(CREATE_PRODUCT_IMAGE);

  return useCallback(
    async ({
      variantName,
      variantDescription,
      variantPrice,
      deleteAfterPurchase,
      imageData,
      prevVariant,
      product,
    }) => {
      // If product only has a default variant, update that instead of creating a new one
      if (product.hasOnlyDefaultVariant) {
        prevVariant = product.variants.edges[0].node;
      }
      let newImage;
      let result;

      if (imageData) {
        imageData.id
          ? await updateProductImage({
              variables: {
                image: imageData,
                productId: product.id,
              },
              onCompleted: handleUserErrors,
            })
          : await createProductImage({
              variables: {
                input: {
                  id: product.id,
                  images: [imageData],
                },
              },
              onCompleted: (data) => {
                handleUserErrors(data);

                newImage = data.productAppendImages.newImages[0];
              },
            });
      }

      const variantInput = {
        id: prevVariant?.id,
        options: [variantName],
        price: variantPrice,
        imageId: newImage?.id,
        inventoryItem: {
          tracked: false,
        },
        metafields: [
          {
            id: prevVariant?.description?.id,
            description: "Description for unique variant",
            type: "multi_line_text_field",
            namespace: METAFIELD_NAMESPACE.variants,
            key: METAFIELD_KEY.variantDescription,
            value: variantDescription,
          },
        ],
        privateMetafields: [
          {
            namespace: METAFIELD_NAMESPACE.variants,
            key: METAFIELD_KEY.deleteAfterPurchase,
            valueInput: {
              value: `${deleteAfterPurchase}`,
              valueType: "STRING",
            },
          },
        ],
      };

      if (!prevVariant) {
        variantInput.productId = product.id;
        await createVariant({
          variables: {
            variantInput,
          },
          onCompleted: (data) => {
            handleUserErrors(data);

            result = data.productVariantCreate.productVariant;
          },
        });
      } else if (
        product?.hasOnlyDefaultVariant ||
        variantName !== prevVariant?.name?.value ||
        variantDescription !== prevVariant?.description?.value ||
        variantPrice !== prevVariant?.price ||
        newImage
      ) {
        await updateVariant({
          variables: {
            input: variantInput,
          },
          onCompleted: (data) => {
            handleUserErrors(data);

            result = data.productVariantUpdate.productVariant;
          },
        });
      }

      return result;
    }
  );
};
