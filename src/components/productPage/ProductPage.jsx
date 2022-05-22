import {
  Card,
  Spinner,
  Stack,
  TextContainer,
  TextStyle
} from "@shopify/polaris"
import { fetchProduct } from "../../utils/fetchProduct";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { generateProductGid } from "../../utils/gidHelper";

import { ProductInfo } from "./ProductInfo";
import { VariantsList } from "./VariantsList";

export const ProductPage = () => {
  const { productId } = useParams();
  const { 
    product, 
    variants, 
    pageInfo, 
    loading, 
    error,
    fetchMore
  } = fetchProduct(generateProductGid(productId));

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
      return (
        <Card
          title="Product Info"
        >
          <Card.Section>
            <Stack>
              <ProductInfo product={product} />
            </Stack>
          </Card.Section>
          <Card.Section>
            <Stack>
              <VariantsList variants={variants} />
            </Stack>
          </Card.Section>
        </Card>
      );
    }

    return null;
  }, [product, variants, pageInfo, loading, error]);

  return pageMarkup;
};