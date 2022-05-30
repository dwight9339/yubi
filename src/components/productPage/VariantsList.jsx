import { 
  ResourceList,
  ResourceItem,
  Stack,
  TextContainer,  
  Thumbnail,
  Heading
} from "@shopify/polaris"
import { getIdFromGid } from "../../utils/gidHelper";
import { useNavigate } from "react-router-dom";
import { deleteVariant } from "../../utils/deleteVariant";

export const VariantsList = ({ variants, refetch }) => {
  const navigate = useNavigate();
  const deleteVariantHook = deleteVariant();

  const renderItem = (variant) => {
    const { id, image, title, price } = variant;
    const variantId = getIdFromGid(id);

    return (
      <ResourceItem
        id={variantId}
        shortcutActions={[
          {
            content: "edit",
            onAction: () => navigate(`/variant/${variantId}/edit`)
          },
          {
            content: "delete",
            onAction: async () => {
              await deleteVariantHook(variant);
              navigate(".", {state: {reload: true}});
            }
          }
        ]}
        onClick={() => navigate(`/variant/${variantId}`)}
      >
        <Stack distribution="fill">
          <Stack.Item>
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