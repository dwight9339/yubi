import { FETCH_PRODUCTS } from "../graphql/queries/fetchProducts";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { QUERY_PAGE_SIZE } from "../constants";

export const fetchProducts = () => {
  const { data, loading, error, fetchMore } = useQuery(FETCH_PRODUCTS, {
    variables: {
      first: QUERY_PAGE_SIZE.products
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network"
  });

  const { products, pageInfo } = useMemo(() => {
    if (!data) {
      return { products: [], pageInfo: {} };
    }

    return {
      products: data.products.edges.map(({ node }) => node),
      pageInfo: data.products.pageInfo
    }
  });

  return useMemo(() => ({products, pageInfo, loading, error, fetchMore}), [products, pageInfo, loading, error]);
};