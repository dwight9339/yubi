import { ADD_TAGS } from "../../graphql/mutations/addTags";
import { useMutation } from "@apollo/client/react";
import { useCallback } from "react";
import { UV_TAG } from "../../constants";
import { handleUserErrors } from "../errorHelper";

export const addUvTag = () => {
  const [addTagsMutation] = useMutation(ADD_TAGS);

  return useCallback(async (productId) => {
    await addTagsMutation({
      variables: {
        resourceId: "gid://shopify/Product/777",
        tags: [UV_TAG]
      },
      onCompleted: handleUserErrors
    });
  });
} 