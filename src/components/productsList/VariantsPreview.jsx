import { 
  ResourceList,
  ResourceItem,
  Button,
  Collapsible,
  Thumbnail
} from "@shopify/polaris";
import { CaretUpMinor, CaretDownMinor } from "@shopify/polaris-icons";
import { getIdFromGid } from "../../utils/gidHelper";

export const VariantsPreview = ({ productId, items, listOpen, toggleList }) => {
  const renderVariantListItem = (variant) => {
    const variantId = getIdFromGid(variant.id);

    return <ResourceItem
      id={variantId}
      onClick={() => navigate(`/variant/${variantId}`)}
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
      <Button
          icon={listOpen 
            ? CaretUpMinor
            : CaretDownMinor
          }
          size="slim"
          onClick={toggleList}
      />
      <Collapsible
        id={`variants-preview-for-product-${productId}`}
        open={listOpen}
      >
        <h2>Variants</h2>
        <ResourceList
          resourceName={{
            plural: "variants",
            singular: "variant"
          }}
          emptyState={<h3>No variants</h3>}
          items={items}
          renderItem={renderVariantListItem}
        />
      </Collapsible>
    </>
  )
}