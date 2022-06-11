import { useMutation, useLazyQuery } from "@apollo/client";
import { useCallback } from "react";
import { 
  CONVERT_PRODUCT,
  CONVERT_PRODUCT_DELETE_VARIANTS
} from "../../graphql/mutations/convertProduct";
import { FETCH_VARIANTS_BY_PRODUCT } from "../../graphql/queries/fetchVariantsByProduct"

export const convertProduct = (productId) => {
  const [fetchVariantsQuery] = useLazyQuery(FETCH_VARIANTS_BY_PRODUCT(productId));
  const [convertProductMutation] = useMutation(CONVERT_PRODUCT);
  const [ConvertProductDeleteVariantsMutation] = useMutation(CONVERT_PRODUCT_DELETE_VARIANTS) 

  return useCallback(async (product) => {
    let variants;

    if (product.options.length > 1) {
      const { data, errors} = await fetchVariantsQuery({
        variables: {
          first: 100
        }
      });

      if (errors) {
        console.error(`convertProduct hook - fetch variants error - ${errors}`);
        throw errors.map((error) => error.message);
      }

      const { productVariants, userErrors } = data;

      if (userErrors) {
        console.error(`convertProduct hook - fetch variants error - ${userErrors}`);
        throw userErrors.map((error) => error.message);
      }
      variants = productVariants.edges.map(({ node }) => node);
    }

    const { data, errors } = variants?.length
      ? await ConvertProductDeleteVariantsMutation({
        variables: {
          productId: product.id,
          variantsIds: variants.map((variants) => variants.id)
        }
      })
      : await convertProductMutation({
        variables: {
          productId: product.id
        }
      });

      if (errors) {
        console.error(`convertProduct hook - convert product error - ${errors}`);
        throw errors.map((error) => error.message);
      } else if (data.userErrors?.length) {
        console.error(`convertProduct hook - convert product error - ${data.userErrors}`);
        throw data.userErrors.map((error) => error.message);
      }
  });
};