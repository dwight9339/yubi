import {
  Page,
  Card,
  Stack,
  ResourceList,
  ResourceItem,
  Thumbnail,
  Pagination,
  Spinner,
  TextContainer, 
  TextStyle
} from "@shopify/polaris";
import { getIdFromGid } from "../../utils/gidHelper";
import { useMemo } from "react";
import { fetchProducts } from "../../utils/fetchProducts";
import { QUERY_PAGE_SIZE } from "../../constants";

export const ProductsList = () => {
  const { 
    products, 
    pageInfo, 
    loading, 
    error, 
    fetchMore 
  } = fetchProducts();

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

  const renderItem = (product) => {
    const { id, title, featuredImage, totalVariants } = product;
    const productId = getIdFromGid(id);

    return (
      <ResourceItem id={productId} name={title} url={`/products/${productId}`}>
        <Thumbnail
          source={featuredImage ? featuredImage.url : ""}
          alt={featuredImage ? featuredImage.altText : ""}
        /> 
        <h3>{title}</h3>
        <h4>Variants: {totalVariants}</h4>
      </ResourceItem>
    );
  };

  const pageContent = useMemo(() => {
    if (!products || loading) {
      return <Spinner />;
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

    if (products) {
      return (
        <div className="products-list-container">
          <ResourceList
            resourceName={{
              singular: "product",
              plural: "products",
            }}
            items={products}
            renderItem={renderItem}
            emptyState={<h1>No unique variant products</h1>}
          />
          <Pagination
            hasNext={pageInfo && pageInfo.hasNextPage }
            hasPrevious={pageInfo && pageInfo.hasPreviousPage }
            onNext={getNextPage}
            onPrevious={getPrevPage}
          />
        </div>
      );
    }

    return null;
  }, [products, pageInfo, loading, error]);

  return (
    <Page title="Unique Variants Products">
      <Card>
        <Stack alignment="center">
          {pageContent} 
        </Stack>
      </Card>
    </Page>
  );
};