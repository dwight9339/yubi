import {
  ResourceItem,
  Thumbnail,
  Stack,
  Heading,
  TextContainer,
  TextStyle
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { getIdFromGid } from "../../utils/gidHelper";
import { deleteProduct } from "../../utils/apiHooks/deleteProduct";

export const ProductsListItem = ({ product }) => {
  const { id, title, featuredImage, totalVariants } = product;
  const productId = getIdFromGid(id);
  const navigate = useNavigate();
  const deleteProductHook = deleteProduct();

  const handleDelete = async () => {
    await deleteProductHook(id);

    navigate(".", {state: {reload: true}});
  }

  return (
    <ResourceItem 
      id={productId} 
      name={title} 
      onClick={() => navigate(`/product/${productId}`)}
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
        <Stack.Item fill>
          <Thumbnail
            source={featuredImage ? featuredImage.url : ""}
            alt={featuredImage ? featuredImage.altText : ""}
          /> 
          <Heading>{title}</Heading>
        </Stack.Item>
        <Stack.Item>
          <TextContainer>
            <TextStyle variation="strong">Variants: </TextStyle>{totalVariants}
          </TextContainer>
        </Stack.Item>
      </Stack>
    </ResourceItem>
  );
}