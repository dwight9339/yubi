import { 
  ResourceList,
  ResourceItem,
  Stack,
  TextContainer,  
  Thumbnail,
  Heading
} from "@shopify/polaris"
import { getIdFromGid } from "../../utils/gidHelper";

export const VariantsList = ({ variants }) => {
  const renderItem = (variant) => {
    const { id, image, title, price } = variant;
    const variantId = getIdFromGid(id);

    return (
      <ResourceItem
        id={variantId}
        shortcutActions={[
          {
            content: "edit",
            /* To do - url: variant-edit */
          },
          {
            content: "delete",
            /* To do - onAction: () => deleteVariant(id) */
          }
        ]}
        url={`variant/${variantId}`}
      >
        <Stack>
          <Stack.Item fill>
            <Thumbnail
              source={image ? image.url : ""}
              alt={image ? image.altText : ""}
            /> 
            <Heading>{title}</Heading>
          </Stack.Item>
          <Stack.Item>
            <TextContainer>
              {price}
            </TextContainer>
          </Stack.Item>
        </Stack>
      </ResourceItem>
    )
  }

  return (
    <Stack
      distribution="fill"
    >
      <ResourceList
        resourceName={{
          singular: "variant",
          plural: "variants",
        }}
        items={variants || []}
        renderItem={renderItem}
        emptyState={<h3>No variants</h3>}
      />
    </Stack>
  )
}