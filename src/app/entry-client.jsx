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
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes"



function MyProvider({ children }) {
  const app = useAppBridge();
  const cacheOptions = {
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: false
          },
          productVariants: {
            keyArgs: false,
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

const container = document.getElementById("app");
const root = createRoot(container);

root.render((
  <PolarisProvider 
    i18n={translations}
  >
    <AppBridgeProvider
      config={{
        apiKey: process.env.SHOPIFY_API_KEY,
        host: new URL(location).searchParams.get("host"),
        forceRedirect: true,
      }}
    >
      <MyProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </MyProvider>
    </AppBridgeProvider>
  </PolarisProvider>
));


