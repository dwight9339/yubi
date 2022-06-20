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
import { ConvertProductModal } from "../common/ConvertProductModal";
import { UV_TAG } from "../../constants";
import { AddUvTagModal } from "../common/AddUvTagModal";

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
  const [overrideTagModal, setOverrideTagModal] = useState(false);
  const isValidProduct = useMemo(() => {
    return product?.options?.length === 1;
  }, [product]);
  const hasUvTag = useMemo(() => {
    return product?.tags?.includes(UV_TAG);
  }, [product]);


  useEffect(() => {
    if (!location.state) return;

    const { reload } = location.state;

    if (reload) {
      refetchProduct();
      refetchVariants();
      location.state.reload = false;
    }
  });

  const outletContext = {
    product,
    variants,
    pageInfo,
    fetchMoreVariants
  };

  const pageMarkup = useMemo(() => {
    if (loading) {
      return (
        <div data-testid="spinner">
          <Spinner />
        </div>
      )
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
            show={!isValidProduct}
          />
          <AddUvTagModal
            productId={product.id}
            show={isValidProduct && !hasUvTag && !overrideTagModal}
            onClose={() => setOverrideTagModal(true)}
          />
          <Outlet context={outletContext} />
        </>
      )
    }

    return null;
  }, [product, variants, pageInfo, loading, errors, overrideTagModal]);

  return (
    <Page
      title="Product"
      breadcrumbs={[
        {
          content: "Products",
          onAction: () => navigate("/products", {state: {reload: true}}),
          accessibilityLabel: "Return to products list page"
        }
      ]}
    >
      
      {pageMarkup}
    </Page>
  );;
};