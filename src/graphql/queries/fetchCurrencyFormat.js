import gql from "graphql-tag";

export const FETCH_CURRENCY_FORMAT = gql`
  {
    shop {
      currencyFormats {
        moneyFormat
      }
    }
  }
`;