import {
  Card,
  Spinner,
  Stack,
  TextContainer,
  TextStyle,
  Pagination
} from "@shopify/polaris"
import { fetchProduct } from "../../utils/fetchProduct";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { generateProductGid } from "../../utils/gidHelper";
import { QUERY_PAGE_SIZE } from "../../constants";

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

  const getNextPage = () => {
    fetchMore({
      variables: {
        variants_first: QUERY_PAGE_SIZE.variants,
        variants_last: null,
        variants_end_cursor: pageInfo.endCursor,
        variants_start_cursor: null
      }
    });
  };

  const getPrevPage = () => {
    fetchMore({
      variables: {
        variants_first: null,
        variants_last: QUERY_PAGE_SIZE.variants,
        variants_end_cursor: null,
        variants_start_cursor: pageInfo.startCursor
      }
    })
  }

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
          <Card.Section
            title="Product"
          >
            <Stack>
              <ProductInfo product={product} />
            </Stack>
          </Card.Section>
          <Card.Section
            title="Variants"
            actions={[
              {
                content: "Create variants",
                /* To do - url: variant-creation */
              }
            ]}
          >
            <Stack>
              <VariantsList variants={variants} />
            </Stack>
          </Card.Section>
          <Card.Section>
            <Pagination
              hasNext={pageInfo.hasNextPage}
              hasPrevious={pageInfo.hasPreviousPage}
              onNext={getNextPage}
              onPrevious={getPrevPage}
            />
          </Card.Section>
        </Card>
      );
    }

    return null;
  }, [product, variants, pageInfo, loading, error]);

  return pageMarkup;
};