import { FETCH_VARIANT } from "../../graphql/queries/fetchVariant";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";

export const fetchVariant = (id) => {
  const { data, loading, error, refetch } = useQuery(FETCH_VARIANT, {
    variables: {
      id
    }
  });

  const variant = useMemo(() => {
    if (!data) return {variant: {}};

    const { productVariant } = data;
    const variant = { ...productVariant }
    variant.deleteAfterPurchase = variant.deleteAfterPurchase?.value === "true";
    return variant;
  }, [data])

  return useMemo(() => ({ variant, loading, error, refetch }), [variant, loading, error, refetch]);
} 