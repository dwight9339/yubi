import { InMemoryCache } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { PolarisTestProvider } from "@shopify/polaris";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react/components";
import translations from "@shopify/polaris/locales/en.json";

export const mockProvidersWrap = (apolloMocks) => {
  return ({ children }) => {
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
  
    const cache = new InMemoryCache(cacheOptions);
  
    return (
      <PolarisTestProvider 
        i18n={translations}
      >
        <AppBridgeProvider
          config={{
            apiKey: "test-key",
            host: "test-host",
            shopOrigin: "testapp.myshopify.com",
            forceRedirect: true, 
          }}
        >
          <MockedProvider 
            mocks={apolloMocks}
            cache={cache}
          >
            {children}
          </MockedProvider>
        </AppBridgeProvider>
      </PolarisTestProvider>
    );
  }
}