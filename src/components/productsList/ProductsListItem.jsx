import {
  ResourceItem,
  Thumbnail
} from "@shopify/polaris";
import { getIdFromGid } from "../../utils/gidHelper";

export const ProductsListItem = ({ product }) => {
  const { id, title, featuredImage, totalVariants } = product;
    const productId = getIdFromGid(id);

    return (
      <ResourceItem id={productId} name={title} url={`/products/${productId}`}>
        <Thumbnail
          source={featuredImage ? featuredImage.url : ""}
          alt={featuredImage ? featuredImage.altText : ""}
        /> 
        <h3>{title}</h3>
        <h4>Variants: {totalVariants}</h4>
      </ResourceItem>
    );
}