import {
  ResourceList,
  Pagination,
  Card,
  Stack,
  Autocomplete
} from "@shopify/polaris"
import { ProductsListItem } from "./ProductsListItem";
import { QUERY_PAGE_SIZE } from "../../constants";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { ProductsListEmptyState } from "./ProductsListEmptyState";

export const ProductsList = ({ products, pageInfo, fetchMore }) => {
  const { width: windowWidth } = useWindowDimensions();

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
    <div
      style={{
        width: windowWidth * 0.6
      }}
    >
      <Card 
        className="products-list-container" 
      >
        <Card.Section>
          <ResourcePicker 
            resourceType="Product"
            open={false}
          />
        </Card.Section>
        <Card.Section>
          <Stack distribution="fill">
            <ResourceList
              resourceName={{
                singular: "product",
                plural: "products",
              }}
              items={[]}
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