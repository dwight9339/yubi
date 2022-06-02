import { useMutation, useLazyQuery } from "@apollo/client";
import { useCallback } from "react";
import { UPDATE_PRODUCT } from "../../graphql/mutations/updateProduct";
import { DELETE_VARIANTS } from "../../graphql/mutations/deleteVariants";
import { ADD_TAGS } from "../../graphql/mutations/addTags";
import { FETCH_VARIANTS_BY_PRODUCT } from "../../graphql/queries/fetchVariantsByProduct"
import { UV_TAG, UV_TEMPLATE_SUFFIX } from "../../constants";

export const convertProduct = (productId) => {
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT);
  const [deleteVariantsMutation] = useMutation(DELETE_VARIANTS);
  const [addTagsMutation] = useMutation(ADD_TAGS);
  const [fetchVariantsQuery] = useLazyQuery(FETCH_VARIANTS_BY_PRODUCT(productId));

  return useCallback(async (product) => {
    const hasMultipleOptions = product.options.length > 1;
    const noUvTag = !product.tags.includes(UV_TAG);
    const nonUvTemplate = !(product.templateSuffix === UV_TEMPLATE_SUFFIX);
    let results = {};

    if (hasMultipleOptions) {
      const { data: { productVariants }} = await fetchVariantsQuery({
        variables: {
          first: 100
        }
      });

      const variantsIds = productVariants.edges.map(({ node }) => node.id);
      const variantDeletionResults = await deleteVariantsMutation({
        variables: {
          productId: product.id,
          variantsIds
        }
      });

      results = {
        variantDeletionResults,
        ...results
      };
    }

    if (noUvTag) {
      const tagAddResults = await addTagsMutation({
        variables: {
          resourceId: product.id,
          tags: [UV_TAG]
        }
      });

      results = {
        tagAddResults,
        ...results
      };
    }

    if (nonUvTemplate) {
      const productUpdateResults = await updateProductMutation({
        variables: {
          input: {
            id: product.id,
            templateSuffix: UV_TEMPLATE_SUFFIX
          }
        }
      });

      results = {
        productUpdateResults,
        ...results
      };
    }
    
    return results;
  });
};