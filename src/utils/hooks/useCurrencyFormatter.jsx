import { fetchCurrencyFormat } from "../apiHooks/fetchCurrencyFormat";
import { useState, useCallback, useEffect } from "react";

export const useCurrencyFormatter = () => {
  const fetchCurrencyFormatHook = fetchCurrencyFormat();
  const [currencyFormatString, setCurrencyFormatString] = useState("${{amount}}");

  const getCurrencyFormat = async () => {
    try {
      const formatString = await fetchCurrencyFormatHook();
      setCurrencyFormatString(formatString);
    } catch(err) {
      console.error(`Currency formatter error - ${err}`);
    }
  }

  useEffect(() => {
    getCurrencyFormat();
  }, []);

  const formatCurrency = useCallback((amount) => {
    return currencyFormatString.replace("{{amount}}", amount);
  }, [currencyFormatString]);

  return formatCurrency;
}