import {
  Page,
  Spinner,
  TextContainer,
  TextStyle
} from "@shopify/polaris"
import { fetchProduct } from "../../../utils/apiHooks/fetchProduct";
import { useMemo, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { generateProductGid } from "../../../utils/gidHelper";
import { ConvertProductModal } from "../../modals/ConvertProductModal";
import { UV_TAG } from "../../../constants";
import { AddUvTagModal } from "../../modals/AddUvTagModal";
import { LoadingPage } from "../../common/LoadingPage";

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
      return <LoadingPage />;
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
          <ConvertProductModal
            product={product}
            refetch={refetchProduct}
            show={!isValidProduct}
          />
          <AddUvTagModal
            productId={product.id}
            show={isValidProduct && !hasUvTag && !overrideTagModal}
            onClose={() => setOverrideTagModal(true)}
            refetch={refetchProduct}
          />
          <Outlet context={outletContext} />
        </Page>
      )
    }

    return null;
  }, [product, variants, pageInfo, loading, errors, overrideTagModal]);

  return (
    <>
      {pageMarkup}
    </> 
  );
};