import {
  Card,
  Stack,
  Pagination
} from "@shopify/polaris";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ProductInfo } from "./ProductInfo";
import { VariantsList } from "./VariantsList";

export const ProductView = () => {
  const navigate = useNavigate();
  const { 
    product, 
    variants, 
    pageInfo,  
    fetchMore,
    refetch
  } = useOutletContext();

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

  return (
    <Stack
      distribution="fill"
    >
      <Card
        title="Product Info"
        actions={[
          {
            content: "Edit",
            onAction: () => navigate("edit")
          }
        ]}
      >
        <Stack>
          <ProductInfo product={product} />
        </Stack>
      </Card>
      <Card
        title="Variants"
        actions={[
          {
            content: "New variant",
            onAction: () => navigate("new-variant")
          }
        ]}
      >
        <Card.Section>
          <Stack>
            <VariantsList variants={variants} refetch={refetch} />
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
    </Stack>
  );
}