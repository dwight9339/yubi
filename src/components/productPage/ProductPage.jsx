import {
  Page,
  Spinner,
  TextContainer,
  TextStyle
} from "@shopify/polaris"
import { fetchProduct } from "../../utils/apiHooks/fetchProduct";
import { useMemo, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { generateProductGid } from "../../utils/gidHelper";
import { productRequirementsAudit } from "../../utils/productHelper";
import { ConvertProductModal } from "../common/ConvertProductModal";

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

  useEffect(() => {
    if (!location.state) return;

    const { reload } = location.state;

    if (reload) {
      refetchProduct();
      refetchVariants();
      location.state.reload = false;
    }
  }, [location.state]);

  const outletContext = {
    product,
    variants,
    pageInfo,
    fetchMoreVariants
  };

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
      const productAuditFailed = !productRequirementsAudit(product);

      return (
        <>
          <ConvertProductModal
            product={product}
            refetch={() => {
              navigate(".", {
                state: {
                  reloadProduct: true, 
                  reloadVariants: true
                }
              });
            }}
            show={productAuditFailed}
          />
          <Outlet context={outletContext} />
        </>
      )
    }

    return null;
  }, [product, variants, pageInfo, loading, errors]);

  return (
    <Page
      title="Product"
      breadcrumbs={[
        {
          content: "Products",
          onAction: () => navigate("/", {state: {reload: true}}),
          accessibilityLabel: "Return to products list page"
        }
      ]}
    >
      
      {pageMarkup}
    </Page>
  );;
};