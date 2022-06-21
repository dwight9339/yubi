import { 
  DELETE_VARIANT, 
  DELETE_VARIANT_AND_IMAGE
} from "../../graphql/mutations/deleteVariant";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { handleUserErrors } from "../errorHelper";

export const deleteVariant = () => {
  const [deleteVariant] = useMutation(DELETE_VARIANT);
  const [deleteVariantAndImage] = useMutation(DELETE_VARIANT_AND_IMAGE);

  return useCallback(async ({ id, image, product }) => {
    image
      ? await deleteVariantAndImage({
        variables: {
          variantId: id,
          productId: product.id,
          imageId: image.id
        },
        onCompleted: handleUserErrors
      })
      : await deleteVariant({
        variables: {
          id
        },
        onCompleted: handleUserErrors
      });
  });
};