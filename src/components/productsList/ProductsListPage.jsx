import {
  Page,
  Stack,
  Spinner,
  TextContainer, 
  TextStyle
} from "@shopify/polaris";
import { useMemo, useEffect } from "react";
import { fetchProducts } from "../../utils/apiHooks/fetchProducts";
import { Outlet, useLocation } from "react-router-dom";

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
      return <Spinner />;
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
        <Outlet
          context={{
            products,
            pageInfo,
            fetchMore
          }}
        />
      );
    }

    return null;
  }, [products, pageInfo, loading, error]);

  return (
    <Page
      title="Products List"
    >
      {pageContent}
    </Page>
  );
};