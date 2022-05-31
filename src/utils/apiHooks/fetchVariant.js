import { FETCH_VARIANT } from "../../graphql/queries/fetchVariant";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";

export const fetchVariant = (id) => {
  const { data, loading, error, refetch } = useQuery(FETCH_VARIANT, {
    variables: {
      id
    }
  });

  const { variant } = useMemo(() => {
    if (!data) return {variant: {}};

    return { variant: data.productVariant };
  }, [data])

  return useMemo(() => ({ variant, loading, error, refetch }), [variant, loading, error, refetch]);
} 