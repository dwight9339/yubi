import {
  Page,
  TextContainer, 
  TextStyle
} from "@shopify/polaris";
import { useMemo, useEffect} from "react";
import { fetchProducts } from "../../../utils/apiHooks/fetchProducts";
import { Outlet, useLocation } from "react-router-dom";
import { LoadingPage } from "../../common/LoadingPage";

export const ProductsListPage = () => {
  const location = useLocation();
  const { 
    products, 
    pageInfo, 
    loading, 
    error, 
    fetchMore,
    refetch
  } = fetchProducts();

  useEffect(() => {
    if (!location.state) return;

    const { reload } = location.state;
    
    if (reload) {
      location.state.reload = false;
      refetch();
    }
  });

  const pageContent = useMemo(() => {
    if (!products || loading) {
      return <LoadingPage />;
    }

    if (error) {
      return (
        <TextContainer>
          <TextStyle variation="negative">
            Unable to load products: {error.message}.
          </TextStyle>
        </TextContainer>
      );
    }

    if (products) {
      return (
        <Page
          title="Products"
        >
          <Outlet
            context={{
              products,
              pageInfo,
              fetchMore
            }}
          />
        </Page>
      );
    }

    return null;
  }, [products, pageInfo, loading, error]);

  return (
    <div
      style={{
        maxWidth: "600px"
      }}
    >
      {pageContent}
    </div>
  );
};