import { ProductForm } from "../forms/ProductForm";
import { Card } from "@shopify/polaris";
import { useOutletContext, useNavigate } from "react-router-dom";

export const ProductEdit = () => {
  const { product } = useOutletContext();
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate("..", {state: {reload: true}});
  }

  return (
    <Card
      title="Edit Product"
      actions={[
        {
          content: "Cancel",
          onAction: () => navigate("..")
        }
      ]}
    >
      <ProductForm
        product={product}
        onSuccess={handleSuccess}
      />
    </Card>
  );
}