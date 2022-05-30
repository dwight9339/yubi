import { VariantForm } from "../forms/VariantForm";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Card } from "@shopify/polaris";

export const VariantEdit = () => {
  const { variant } = useOutletContext();
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate("..", { state: { reload: true }});
  }

  return (
    <Card
      title="Edit Variant"
      actions={[
        {
          content: "Cancel",
          onAction: () => navigate("..")
        }
      ]}
    >
      <VariantForm
        variant={variant}
        onSuccess={handleSuccess}
      />
    </Card>
  );
};