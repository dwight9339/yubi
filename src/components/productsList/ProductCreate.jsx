import { 
  Card 
} from "@shopify/polaris";
import { useNavigate } from "react-router";
import { ProductForm } from "../forms/ProductForm";

export const ProductCreate = () => {
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate("/", {state: {reload: true}});
  }

  return (
    <Card
      title="New Unique Variants Product"
    >
      <ProductForm
        onSuccess={handleSuccess}
      />
    </Card>
  )
}