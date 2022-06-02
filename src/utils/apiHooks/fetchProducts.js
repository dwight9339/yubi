import { FETCH_PRODUCTS } from "../../graphql/queries/fetchProducts";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { QUERY_PAGE_SIZE } from "../../constants";

export const fetchProducts = () => {
  const { data, loading, error, fetchMore, refetch } = useQuery(FETCH_PRODUCTS, {
    variables: {
      first: QUERY_PAGE_SIZE.products
    },
    fetchPolicy: "cache-first"
  });

  const { products, pageInfo } = useMemo(() => {
    if (!data) {
      return { products: [], pageInfo: {} };
    }

    let products = data.products.edges.map(({ node }) => node);
    products.variantsMap = {};
    products.forEach(product => {
      products.variantsMap[product.id] = product.variants.edges?.map(({ node }) => node);
    });
    

    return {
      products,
      pageInfo: data.products.pageInfo
    }
  });

  return useMemo(
    () => ({products, pageInfo, loading, error, fetchMore, refetch}), 
    [products, pageInfo, loading, error]
  );
};