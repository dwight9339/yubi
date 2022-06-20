import { useMutation, useLazyQuery } from "@apollo/client";
import { useCallback } from "react";
import { CONVERT_PRODUCT } from "../../graphql/mutations/convertProduct";
import { FETCH_VARIANTS_BY_PRODUCT } from "../../graphql/queries/fetchVariantsByProduct"

export const convertProduct = (productId) => {
  const [fetchVariantsQuery] = useLazyQuery(FETCH_VARIANTS_BY_PRODUCT(productId));
  const [convertProductMutation] = useMutation(CONVERT_PRODUCT);

  return useCallback(async (product) => {
    try {
      const variantsResult = await fetchVariantsQuery({
        variables: {
          first: 100
        }
      });
      const { productVariants, userErrors: variantsErrors } = variantsResult.data;
      const variants = productVariants.edges.map(({ node }) => node);
  
      const conversionResult = await convertProductMutation({
        variables: {
          productId: product.id,
          variantsIds: variants.map((variant) => variant.id)
        }
      });
    } catch(err) {
      throw `Product conversion error - ${err}`;
    }
  });
};