import {
  Card,
  Stack,
  Pagination
} from "@shopify/polaris";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ProductInfo } from "./ProductInfo";
import { VariantsList } from "./VariantsList";
import { deleteProduct } from "../../utils/apiHooks/deleteProduct";
import { QUERY_PAGE_SIZE } from "../../constants";

export const ProductView = () => {
  const deleteProductHook = deleteProduct();
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

  const handleDelete = async () => {
    await deleteProductHook(product.id);

    navigate("/", {state: {reload: true}});
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
            onAction: handleDelete
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