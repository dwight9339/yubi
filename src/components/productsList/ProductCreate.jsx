import { 
  Card 
} from "@shopify/polaris";
import { useNavigate } from "react-router";
import { ProductForm } from "../forms/ProductForm";
import { getIdFromGid } from "../../utils/gidHelper";

export const ProductCreate = () => {
  const navigate = useNavigate();
  const handleSuccess = (results) => {
    console.log(`Create Results: ${JSON.stringify(results)}`);
    const { data: { productCreate } } = results;
    const { product, userErrors } = productCreate;
    const id = getIdFromGid(product.id);
    navigate(`/product/${id}`);
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