import {
  ResourceList,
  Pagination,
  Card
} from "@shopify/polaris"
import { ProductsListItem } from "./ProductsListItem";
import { QUERY_PAGE_SIZE } from "../../constants";

export const ProductsList = ({ products, pageInfo, fetchMore }) => {
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
    <Card 
      className="products-list-container"
      styles={{
        width: "100%"
      }}
    >
      <Card.Section>
        <ResourceList
          resourceName={{
            singular: "product",
            plural: "products",
          }}
          items={products || []}
          renderItem={renderItem}
          emptyState={<h1>No unique variant products</h1>}
        />
      </Card.Section> 
      <Card.Subsection>
        <Pagination
        hasNext={pageInfo && pageInfo.hasNextPage}
        hasPrevious={pageInfo && pageInfo.hasPreviousPage}
        onNext={getNextPage}
        onPrevious={getPrevPage}
      />
      </Card.Subsection>
    </Card>
  );
};