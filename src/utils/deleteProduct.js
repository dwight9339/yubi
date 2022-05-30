import { DELETE_PRODUCT } from "../graphql/mutations/deleteProduct";
import { useMutation } from "@apollo/client";
import { useCallback } from "react";

export const deleteProduct = () => {
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);

  return useCallback(async (id) => {
    const results = deleteProductMutation({
      variables: {
        input: {
          id
        }
      }
    });

    return results;
  }, [deleteProductMutation]);
};