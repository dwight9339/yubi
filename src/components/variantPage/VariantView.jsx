import { getIdFromGid } from "../../utils/gidHelper";
import { useCurrencyFormatter } from "../../utils/hooks/useCurrencyFormatter";
import { ResourceInfo } from "../common/ResourceInfo";
import { useOutletContext } from "react-router-dom";

export const VariantView = () => {
  const formatCurrency = useCurrencyFormatter();
  const { variant } = useOutletContext();
  const productId = getIdFromGid(variant.product.id);

  return (
    <ResourceInfo
      resource={variant}
      details={{
        Description: variant.description.value,
        Price: formatCurrency(variant.price)
      }}
      deleteRedirect={`/product/${productId}`}
    />
  )
}