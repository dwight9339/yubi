import {
  ResourceItem,
  ResourceList,
  Thumbnail,
  Stack,
  Heading,
  Button,
  Collapsible
} from "@shopify/polaris";
import { CaretUpMinor, CaretDownMinor } from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getIdFromGid } from "../../utils/gidHelper";
import { deleteProduct } from "../../utils/apiHooks/deleteProduct";

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
      <Stack>
        <Stack.Item 
          fill
        >
          <div
            onClick={() => {
              navigate(`/product/${productId}`);
            }}
          >
            <Thumbnail
              source={featuredImage ? featuredImage.url : ""}
              alt={featuredImage ? featuredImage.altText : ""}
            /> 
          </div>
          <Heading>{title}</Heading>
        </Stack.Item>
        <Stack.Item>
          <Heading>Variants: </Heading>{totalVariants - 1}
        </Stack.Item>
      </Stack>
      <Button
          icon={variantsPreviewOpen 
            ? CaretUpMinor
            : CaretDownMinor
          }
          size="slim"
          onClick={() => setVariantsPreviewOpen(!variantsPreviewOpen)}
      />
      <Collapsible
        id={`variants-preview-for-product-${productId}`}
        open={variantsPreviewOpen}
      >
        <h2>Variants</h2>
        <ResourceList
          resourceName={{
            plural: "variants",
            singular: "variant"
          }}
          emptyState={<h3>No variants</h3>}
          items={hasOnlyDefaultVariant 
            ? []
            : variants
          }
          renderItem={(variant) => {
            const variantId = getIdFromGid(variant.id);

            return <ResourceItem
              id={variantId}
              onClick={() => navigate(`/variant/${variantId}`)}
            >
              <Thumbnail
                size="small"
                source={variant.image?.url}
                alt={variant.image?.altText}
              />
              <h2>{variant.title}</h2>
            </ResourceItem>
          }}
        />
      </Collapsible>
    </ResourceItem>
  );
}