import {
  ResourceItem,
  Thumbnail,
  Stack,
  Heading
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getIdFromGid } from "../../../utils/gidHelper";
import { useContext } from "react";
import { ModalContext } from "../../../app/AppFrame";

import { VariantsPreview } from "./VariantsPreview";

export const ProductsListItem = ({ product, variants }) => {
  const { id, title, featuredImage, totalVariants, hasOnlyDefaultVariant} = product;
  const productId = getIdFromGid(id);
  const navigate = useNavigate();
  const { showConfirmDeleteModal } = useContext(ModalContext);

  const [variantsPreviewOpen, setVariantsPreviewOpen] = useState(false);

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
          onAction: () => {
            showConfirmDeleteModal(product, "/products");
          }
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