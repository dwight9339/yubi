import { FETCH_PRODUCT } from "../../graphql/queries/fetchProduct";
import { FETCH_VARIANTS_BY_PRODUCT } from "../../graphql/queries/fetchVariantsByProduct";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { QUERY_PAGE_SIZE } from "../../constants";
import { getIdFromGid } from "../gidHelper";

export const fetchProduct = (id) => {
  const { 
    data: productData, 
    loading: productLoading, 
    error: productError, 
    refetch: refetchProduct 
  } = useQuery(FETCH_PRODUCT, {
    variables: {
      id
    },
    fetchPolicy: "cache-first"
  });

  const {
    data: variantsData,
    loading: variantsLoading,
    error: variantsError,
    fetchMore: fetchMoreVariants,
    refetch: refetchVariants
  } = useQuery(FETCH_VARIANTS_BY_PRODUCT(getIdFromGid(id)), {
    variables: {
      first: QUERY_PAGE_SIZE.variants
    }
  });

  const vars = useMemo(() => {
    return {
      product: productData?.product || {},
      variants: variantsData?.productVariants?.edges?.map(({ node }) => node) || [],
      pageInfo: variantsData?.productVariants?.pageInfo || {},
      loading: productLoading || variantsLoading,
      errors: {
        productError,
        variantsError
      },
      fetchMoreVariants,
      refetchProduct,
      refetchVariants
    }
  }, [
    productData,
    variantsData,
    productLoading,
    variantsLoading,
    productError,
    variantsError
  ]);

  return useMemo(
    () => vars, 
    [vars]
  );
};