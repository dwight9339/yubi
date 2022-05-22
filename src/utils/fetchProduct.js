import { FETCH_PRODUCT } from "../graphql/queries/fetchProduct";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { QUERY_PAGE_SIZE } from "../constants";

export const fetchProduct = (id) => {
  const { data, loading, error, fetchMore } = useQuery(FETCH_PRODUCT, {
    variables: {
      id,
      variants_first: QUERY_PAGE_SIZE.variants
    },
    fetchPolicy: "cache-first"
  });

  const { product, variants, pageInfo } = useMemo(() => {
    if (!data) {
      return {product: {}, variants: {}, pageInfo: {}}
    }

    const { product } = data;
    const { variants, ...productObj } = product;
    const variantsObj = variants.edges.map(({ node }) => node);
    const pageInfo = variants.pageInfo;
    return {product: productObj, variants: variantsObj, pageInfo};
  }, [data]);

  return useMemo(
    () => ({product, variants, pageInfo, loading, error, fetchMore}), 
    [product, variants, pageInfo, loading, error, fetchMore]
  )
};