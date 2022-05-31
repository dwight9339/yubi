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

export const VariantPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { variantId } = useParams();
  const id = generateVariantGid(variantId);
  const { variant, loading, error, refetch } = fetchVariant(id);

  useEffect(() => {
    if (!location.state) return;
    
    const { reload } = location.state;

    if (reload) refetch();
  })

  const pageContent = useMemo(() => {
    if (loading) return <Spinner />;
    if (error) return (
      <TextContainer>
        <TextStyle variation="negative">
          Unable to load variant: {error.message}
        </TextStyle>
      </TextContainer>
    )

    if (variant) {
      return <Outlet context={{variant}} />;
    } 

    return null;
  }, [variant, loading, error]);

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
        {pageContent}
      </Stack>
    </Page>
  );
};