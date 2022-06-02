import {
  ResourceItem,
  Thumbnail,
  Stack,
  Heading
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getIdFromGid } from "../../utils/gidHelper";
import { deleteProduct } from "../../utils/apiHooks/deleteProduct";

import { VariantsPreview } from "./VariantsPreview";

export const ProductsListItem = ({ product, variants }) => {
  const { id, title, featuredImage, totalVariants, hasOnlyDefaultVariant} = product;
  const productId = getIdFromGid(id);
  const navigate = useNavigate();
  const deleteProductHook = deleteProduct();

  const [variantsPreviewOpen, setVariantsPreviewOpen] = useState(false);

  const handleDelete = async () => {
    await deleteProductHook(id);

    navigate(".", {state: {reload: true}});
  }

  return (
    <ResourceItem 
      id={productId} 
      name={title} 
      shortcutActions={[
        {
          content: "Edit",
          onAction: () => navigate(`/product/${productId}/edit`)
        },
        {
          content: "Delete",
          onAction: handleDelete
        }
      ]}
    >
      <div
        onClick={() => navigate(`/product/${productId}`)}
      >
        <Stack>
          <Stack.Item 
            fill
          >
            <Thumbnail
              source={featuredImage ? featuredImage.url : ""}
              alt={featuredImage ? featuredImage.altText : ""}
            /> 
            <Heading>{title}</Heading>
          </Stack.Item>
          <Stack.Item>
            <Heading>Variants: </Heading>{hasOnlyDefaultVariant ? 0 : totalVariants}
          </Stack.Item>
        </Stack>
      </div>
      { 
        hasOnlyDefaultVariant 
        || <VariantsPreview 
          productId={productId}
          items={
            hasOnlyDefaultVariant 
              ? []
              : variants
          }
          listOpen={variantsPreviewOpen}
          toggleList={() => setVariantsPreviewOpen(!variantsPreviewOpen)}
        />
      }
    </ResourceItem>
  );
}