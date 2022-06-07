import {
  Card,
  Stack,
  Pagination
} from "@shopify/polaris";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ProductInfo } from "./ProductInfo";
import { VariantsList } from "./VariantsList";
import { QUERY_PAGE_SIZE } from "../../constants";
import { useContext } from "react";
import { ModalContext } from "../../app/AppFrame";

export const ProductView = () => {
  const { showConfirmDeleteModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const { 
    product, 
    variants, 
    pageInfo,  
    fetchMoreVariants
  } = useOutletContext();

  const getNextPage = () => {
    fetchMoreVariants({
      variables: {
        first: QUERY_PAGE_SIZE.variants,
        last: null,
        after: pageInfo.endCursor,
        before: null
      }
    });
  };

  const getPrevPage = () => {
    fetchMoreVariants({
      variables: {
        first: null,
        last: QUERY_PAGE_SIZE.variants,
        after: null,
        before: pageInfo.startCursor
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
          },
          {
            content: "Delete",
            onAction: () => {
              showConfirmDeleteModal(product, "/");
            }
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
            <VariantsList 
              variants={
                product.hasOnlyDefaultVariant 
                  ? []
                  : variants
              } 
            />
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