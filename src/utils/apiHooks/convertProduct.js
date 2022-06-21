import { useMutation, useLazyQuery } from "@apollo/client";
import { useCallback } from "react";
import { CONVERT_PRODUCT } from "../../graphql/mutations/convertProduct";
import { FETCH_VARIANTS_BY_PRODUCT } from "../../graphql/queries/fetchVariantsByProduct"
import { handleUserErrors } from "../errorHelper";

export const convertProduct = (productId) => {
  const [fetchVariantsQuery] = useLazyQuery(FETCH_VARIANTS_BY_PRODUCT(productId));
  const [convertProductMutation] = useMutation(CONVERT_PRODUCT);

  return useCallback(async (product) => {
    let variantsIds;
    await fetchVariantsQuery({
      variables: {
        first: 100
      },
      onCompleted: ({ productVariants }) => {
        variantsIds = productVariants.edges.map(({ node }) => node.id);
      },
      onError: (err) => {
        throw err;
      }
    });
    await convertProductMutation({
      variables: {
        productId: product.id,
        variantsIds
      },
      onCompleted: handleUserErrors
    });
  });
};