import {
  Card,
  Stack,
  Pagination,
  Layout
} from "@shopify/polaris";
import { useNavigate, useOutletContext } from "react-router-dom";
import { VariantsList } from "./VariantsList";
import { QUERY_PAGE_SIZE } from "../../constants";
import { ResourceInfo } from "../common/ResourceInfo";

export const ProductView = () => {
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

  const variantCardActions = [
    {
      content: "New variant",
      onAction: () => navigate("new-variant")
    }
  ];

  return (
    <Stack
      distribution="fill"
    >
      <Layout>
        <Layout.Section>
          <ResourceInfo 
            resource={product} 
            details={{
              Description: product.description,
              Tags: product.tags
            }}
            deleteRedirect="/products"
          />
        </Layout.Section>
        <Layout.Section secondary>
          <Card
            title="Variants"
            actions={variantCardActions}
          >
            <Card.Section>
              <Stack distribution="fill">
                <VariantsList 
                  variants={
                    product.hasOnlyDefaultVariant 
                      ? []
                      : variants.filter((variant) => variant.title !== "Default Title")
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
        </Layout.Section>
      </Layout>
    </Stack>
  );
}