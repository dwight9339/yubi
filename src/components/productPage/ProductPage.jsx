import {
  Page,
  Spinner,
  TextContainer,
  TextStyle
} from "@shopify/polaris"
import { fetchProduct } from "../../utils/apiHooks/fetchProduct";
import { useMemo, useEffect } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { generateProductGid } from "../../utils/gidHelper";

export const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const { 
    product, 
    variants, 
    pageInfo, 
    loading, 
    errors,
    fetchMoreVariants,
    refetchProduct,
    refetchVariants
  } = fetchProduct(generateProductGid(productId));
  const outletContext = {
    product,
    variants,
    pageInfo,
    fetchMoreVariants
  };

  useEffect(() => {
    if (!location.state) return;

    const { reloadProduct, reloadVariants } = location.state;

    if (reloadProduct) {
      refetchProduct();
      location.state.reloadProduct = false;
    }
    if (reloadVariants) {
      refetchVariants();
      location.state.reloadVariants = false;
    }
  });

  const pageMarkup = useMemo(() => {
    if (loading) {
      return <Spinner />
    }

    if (errors.productError || errors.variantsError) {
      console.log(`Errors: ${JSON.stringify(errors)}`);
      return (
        <TextContainer>
          <TextStyle variation="negative">
            Unable to load product: <br />
            {errors.productError?.message}
            {errors.variantsError?.message}
          </TextStyle>
        </TextContainer>
      );
    }

    if (product) {
      return <Outlet context={outletContext} />;
    }

    return null;
  }, [product, variants, pageInfo, loading, errors]);

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