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
import { useContext } from "react";
import { ModalContext } from "../../app/AppFrame";
import { useCurrencyFormatter } from "../../utils/hooks/useCurrencyFormatter";

export const VariantsList = ({ variants }) => {
  const navigate = useNavigate();
  const formatCurrency = useCurrencyFormatter();
  const { showConfirmDeleteModal } = useContext(ModalContext);

  const renderItem = (variant) => {
    const { id, image, title, price, product } = variant;
    const variantId = getIdFromGid(id);
    const productId = getIdFromGid(product.id);

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
              showConfirmDeleteModal(variant, `/product/${productId}`);
            }
          }
        ]}
        onClick={() => navigate(`/variant/${variantId}`)}
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
              {formatCurrency(price)}
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
        role="variants-list"
      />
    </Stack>
  )
}