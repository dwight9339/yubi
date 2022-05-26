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

export const ProductsListItem = ({ product }) => {
  const { id, title, featuredImage, totalVariants } = product;
  const productId = getIdFromGid(id);
  const navigate = useNavigate();

  return (
    <ResourceItem 
      id={productId} 
      name={title} 
      onClick={() => navigate(`/product/${productId}`)}
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