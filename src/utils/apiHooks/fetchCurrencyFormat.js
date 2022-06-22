import { useLazyQuery } from "@apollo/client";
import { useCallback } from "react";
import { FETCH_CURRENCY_FORMAT } from "../../graphql/queries/fetchCurrencyFormat";

export const fetchCurrencyFormat = () => {
  const [fetchCurrencyFormat] = useLazyQuery(FETCH_CURRENCY_FORMAT);

  return useCallback(async () => {
    const { data } = await fetchCurrencyFormat();

    return data.shop.currencyFormats.moneyFormat;
  });
}

