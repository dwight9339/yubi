import {
  ResourceList,
  Pagination,
  Card,
  Stack
} from "@shopify/polaris"
import { ProductsListItem } from "./ProductsListItem";
import { QUERY_PAGE_SIZE } from "../../constants";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { ProductsListEmptyState } from "./ProductsListEmptyState";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";

export const ProductsList = () => {
  const navigate = useNavigate();
  const { products, pageInfo, fetchMore } = useOutletContext();
  const { width: windowWidth } = useWindowDimensions();

  const [productPickerOpen, setProductPickerOpen] = useState(false);

  const renderItem = (product) => {
    return <ProductsListItem product={product} />;
  };

  const getNextPage = () => { 
    fetchMore({
      variables: {
        first: QUERY_PAGE_SIZE.products,
        last: null,
        startCursor: null,
        endCursor: pageInfo.endCursor
      }
    });
  };
  const getPrevPage = () => { 
    fetchMore({
      variables: {
        first: null,
        last: QUERY_PAGE_SIZE.products,
        startCursor: pageInfo.startCursor,
        endCursor: null
      }
    });
  };

  return (
    <div>
      <ResourcePicker 
        resourceType="Product"
        open={productPickerOpen}
        showVariants={false}
        showArchived={false}
        showHidden={false}
        selectMultiple={false}
        onSelection={() => {/* To do */}}
      />
      <Card 
        actions={[
          {
            content: "Search Products",
            onAction: () => setProductPickerOpen(!productPickerOpen)
          },
          {
            content: "Create New",
            onAction: () => navigate("/products/new-product")
          }
        ]}
      >
        <Card.Section title="Unique Variants Products">
          <Stack distribution="fill">
            <ResourceList
              resourceName={{
                singular: "product",
                plural: "products",
              }}
              items={products || []}
              renderItem={renderItem}
              emptyState={<ProductsListEmptyState />}
            />
          </Stack>
        </Card.Section> 
        <Card.Section>
            <Pagination
            hasNext={pageInfo && pageInfo.hasNextPage}
            hasPrevious={pageInfo && pageInfo.hasPreviousPage}
            onNext={getNextPage}
            onPrevious={getPrevPage}
          />
        </Card.Section>
      </Card>
    </div>
  );
};