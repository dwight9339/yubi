import { VariantForm } from "../forms/VariantForm";
import { useParams, useNavigate } from "react-router";
import { generateProductGid } from "../../utils/gidHelper";

export const VariantCreate = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(`..`, {state: {reload: true}});
  }

  return (
    <VariantForm
      productId={generateProductGid(productId)}
      onSuccess={handleSuccess}
    />
  );
};