import { 
  EmptyState 
} from "@shopify/polaris";

export const ProductsListEmptyState = () => {
  return (
    <EmptyState
      image="src/assets/UVM_icon.png"
      imageContained
      heading="No Unique Variants products yet"
    />
  );
};