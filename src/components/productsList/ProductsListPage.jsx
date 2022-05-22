import {
  Page,
  Stack,
  Spinner,
  TextContainer, 
  TextStyle
} from "@shopify/polaris";
import { useMemo } from "react";
import { fetchProducts } from "../../utils/fetchProducts";
import { ProductsList } from "./ProductsList";

export const ProductsListPage = () => {
  const { 
    products, 
    pageInfo, 
    loading, 
    error, 
    fetchMore 
  } = fetchProducts();

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
      return <ProductsList 
              products={products} 
              pageInfo={pageInfo}
              fetchMore={fetchMore}
             />;
    }

    return null;
  }, [products, pageInfo, loading, error]);

  return pageContent;
};