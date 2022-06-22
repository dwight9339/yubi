import {
  ResourceList,
  Pagination,
  Card,
  Stack
} from "@shopify/polaris"
import { ProductsListItem } from "./ProductsListItem";
import { QUERY_PAGE_SIZE } from "../../constants";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { ProductsListEmptyState } from "./ProductsListEmptyState";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getIdFromGid } from "../../utils/gidHelper";
import { upsertProduct } from "../../utils/apiHooks/upsertProduct";
import { stageImageUpload } from "../../utils/apiHooks/stageImageUpload";
import {
  getRandomImageFile,
  getRandomName,
  getLoremIpsum
} from "../../utils/test/randomDataHelper";

export const ProductsList = () => {
  const navigate = useNavigate();
  const uploadImageHook = stageImageUpload();
  const createProductHook = upsertProduct();
  const { products, pageInfo, fetchMore } = useOutletContext();

  const [productPickerOpen, setProductPickerOpen] = useState(false);

  const renderItem = (product) => {
    const variants = products.variantsMap[product.id];

    return <ProductsListItem product={product} variants={variants} />;
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

  const handlePickerSelection = ({ selection }) => {
    const { id: productId } = selection[0];
    const id = getIdFromGid(productId);

    navigate(`/product/${id}`);
  }

  const cardActions = [
    {
      content: "Search products",
      accessibilityLabel: "Search for existing products",
      onAction: () => setProductPickerOpen(!productPickerOpen)
    },
    {
      content: "Create new product",
      accessibilityLabel: "Create a new product",
      onAction: () => navigate("/products/new-product")
    },
    {
      content: "Refresh",
      accessibilityLabel: "Refresh items list",
      onAction: () => navigate("/products", {state: {reload: true}})
    }
  ];

  // Add random product button in dev
  const createRandomProduct = async () => {
    const imageFile = await getRandomImageFile();
    const name = await getRandomName();
    const loremIpsum = await getLoremIpsum();

    const imageUploadResult = await uploadImageHook(imageFile);
    const productData = {
      productTitle: name,
      productDescription: loremIpsum,
      imageData: {
        src: imageUploadResult.src,
        altText: `Image of ${name}`
      }
    };

    const productCreateResult = await createProductHook(productData);
  }

  if (process.env.NODE_ENV !== "production") {
    cardActions.splice(0, 0, {
      content: "Random Product",
      onAction: async () => {
        await createRandomProduct();
        navigate("/products", {state: {reload: true}});
      }
    });
  }

  return (
    <div
      style={{
        maxWidth: "500px"
      }}
    >
      <ResourcePicker 
        resourceType="Product"
        open={productPickerOpen}
        showVariants={false}
        showArchived={false}
        showHidden={false}
        selectMultiple={false}
        onSelection={handlePickerSelection}
        onCancel={() => {
          setProductPickerOpen(false);
        }}
      />
      <Card 
        actions={cardActions}
      >
        <Card.Section>
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