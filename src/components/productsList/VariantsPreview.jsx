import { 
  ResourceList,
  ResourceItem,
  Button,
  Collapsible,
  Thumbnail,
  Stack
} from "@shopify/polaris";
import { CaretUpMinor, CaretDownMinor } from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";
import { getIdFromGid } from "../../utils/gidHelper";

export const VariantsPreview = ({ productId, items, listOpen, toggleList }) => {
  const navigate = useNavigate();

  const renderVariantListItem = (variant) => {
    const variantId = getIdFromGid(variant.id);

    return <ResourceItem
      id={variantId}
      shortcutActions={[
        {
          content: "View",
          accessibilityLabel: `View variant ${variant.title}`,
          onAction: () => navigate(`/variant/${variantId}`)
        },
        {
          content: "Edit",
          accessibilityLabel: `Edit variant ${variant.title}`,
          onAction: () => navigate(`/variant/${variantId}/edit`)
        }
      ]}
    >
      <Thumbnail
        size="small"
        source={variant.image?.url || ""}
        alt={variant.image?.altText || ""}
      />
      <h2>{variant.title}</h2>
    </ResourceItem>
  }

  return (
    <>
      <Stack
        distribution="trailing"
      >
        <Button
            icon={listOpen 
              ? CaretUpMinor
              : CaretDownMinor
            }
            size="slim"
            onClick={toggleList}
        />
      </Stack>
      <Collapsible
        id={`variants-preview-for-product-${productId}`}
        open={listOpen}
      >
        <h2><b>Variants</b></h2>
        <ResourceList
          resourceName={{
            plural: "variants",
            singular: "variant"
          }}
          emptyState={<h3>No variants</h3>}
          items={items}
          renderItem={renderVariantListItem}
        />
        <Button
          plain
          onClick={() => navigate(`/product/${productId}`)}
        >
          See more
        </Button>
      </Collapsible>
    </>
  )
}