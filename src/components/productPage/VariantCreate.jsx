import { Card } from "@shopify/polaris";
import { VariantForm } from "../forms/VariantForm";
import { useParams, useNavigate } from "react-router";
import { generateProductGid } from "../../utils/gidHelper";

export const VariantCreate = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(`..`, {state: {reloadVariants: true}});
  }

  return (
    <Card
      title="New Variant"
      actions={[
        {
          content: "Cancel",
          onAction: () => navigate("..")
        }
      ]}
    >
      <VariantForm
        productId={generateProductGid(productId)}
        onSuccess={handleSuccess}
      />
    </Card>
  );
};