import {
  Page,
  Spinner,
  Stack,
  TextContainer,
  TextStyle
} from "@shopify/polaris";
import { fetchVariant } from "../../utils/apiHooks/fetchVariant";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { generateVariantGid, getIdFromGid } from "../../utils/gidHelper";

import { useMemo, useEffect } from "react";
import { LoadingPage } from "../common/LoadingPage";

export const VariantPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { variantId } = useParams();
  const id = generateVariantGid(variantId);
  const { variant, loading, error, refetch } = fetchVariant(id);

  useEffect(() => {
    if (!location.state) return;
    
    const { reload } = location.state;

    if (reload) {
      refetch();
      location.state.reload = false;
    }
  });

  const pageContent = useMemo(() => {
    if (loading) return <LoadingPage />;
    if (error) return (
      <TextContainer>
        <TextStyle variation="negative">
          Unable to load variant: {error.message}
        </TextStyle>
      </TextContainer>
    )

    if (variant) {
      return (
        <Page
          title="Variant"
          breadcrumbs={variant ? [
            {
              content: "Product",
              onAction: () => {
                const productId = getIdFromGid(variant.product.id);
                navigate(`/product/${productId}`);
              },
              accessibilityLabel: "Return to product page"
            }
          ] : []}
        >
          <Stack
            distribution="fill"
          >
            <Outlet context={{variant}} />
          </Stack>
        </Page>
      );
    } 
  }, [variant, loading, error]);

  return (
    <>
      {pageContent}
    </>
  );
};