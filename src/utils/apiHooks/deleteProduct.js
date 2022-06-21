import { DELETE_PRODUCT } from "../../graphql/mutations/deleteProduct";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";

export const deleteProduct = () => {
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);

  return useCallback(async (id) => {
    await deleteProductMutation({
      variables: {
        input: {
          id
        }
      },
      onCompleted: ({ productDelete: { userErrors } }) => {
        if (userErrors.length) {
          throw userErrors.map((error) => error.message);
        }
      }
    });
  }, [deleteProductMutation]);
};