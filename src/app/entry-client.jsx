import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  Provider as AppBridgeProvider,
  useAppBridge
} from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { App } from "./App";
import { ProductsListPage } from "../components/productsList/ProductsListPage";
import { ProductPage } from "../components/productPage/ProductPage";
import { VariantPage } from "../components/variantPage/VariantPage";

function MyProvider({ children }) {
  const app = useAppBridge();
  const cacheOptions = {
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: false
          }
        }
      }
    }
  }

  const client = new ApolloClient({
    cache: new InMemoryCache(cacheOptions),
    link: new HttpLink({
      credentials: "include",
      fetch: userLoggedInFetch(app),
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

ReactDOM.render((
  <PolarisProvider i18n={translations}>
    <AppBridgeProvider
      config={{
        apiKey: process.env.SHOPIFY_API_KEY,
        host: new URL(location).searchParams.get("host"),
        forceRedirect: true,
      }}
    >
      <MyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Navigate to="/products" />} />
              <Route path="products" element={<ProductsListPage />} />
              <Route path="product">
                <Route path=":productId" element={<ProductPage />} />
              </Route>
              <Route path="variant">
                <Route path=":variantId" element={<VariantPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MyProvider>
    </AppBridgeProvider>
  </PolarisProvider>
), document.getElementById("app"));


