import {
  Page,
  Spinner,
  TextContainer,
  TextStyle
} from "@shopify/polaris"
import { fetchProduct } from "../../utils/fetchProduct";
import { useMemo, useEffect } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { generateProductGid } from "../../utils/gidHelper";
import { QUERY_PAGE_SIZE } from "../../constants";

import { ProductInfo } from "./ProductInfo";
import { VariantsList } from "./VariantsList";

export const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const { 
    product, 
    variants, 
    pageInfo, 
    loading, 
    error,
    fetchMore,
    refetch
  } = fetchProduct(generateProductGid(productId));
  const outletContext = {
    product,
    variants,
    pageInfo,
    fetchMore,
    refetch
  };

  useEffect(() => {
    if (!location.state) return;

    const { reload } = location.state;

    if (reload) refetch();
  });

  const pageMarkup = useMemo(() => {
    if (loading) {
      return <Spinner />
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

    if (product) {
      return <Outlet context={outletContext} />;
    }

    return null;
  }, [product, variants, pageInfo, loading, error]);

  return (
    <Page
      title="Product"
      breadcrumbs={[
        {
          content: "Products",
          onAction: () => navigate("/"),
          accessibilityLabel: "Return to products list page"
        }
      ]}
    >
      {pageMarkup}
    </Page>
  );;
};