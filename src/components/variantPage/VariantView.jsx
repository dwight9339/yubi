import { getIdFromGid } from "../../utils/gidHelper";
import { useCurrencyFormatter } from "../../utils/hooks/useCurrencyFormatter";
import { ResourceInfo } from "../common/ResourceInfo";
import { useOutletContext } from "react-router-dom";

import useWindowDimensions from "../../utils/hooks/useWindowDimensions";

export const VariantView = () => {
  const formatCurrency = useCurrencyFormatter();
  const { variant } = useOutletContext();
  const productId = getIdFromGid(variant.product.id);
  const { width: windowWidth } = useWindowDimensions();

  return (
    <div
      style={{
        width: `${windowWidth}px`,
        maxWidth: "600px"
      }}
    >
      <ResourceInfo
        resource={variant}
        details={{
          Description: variant.description?.value || "",
          Price: formatCurrency(variant.price)
        }}
        deleteRedirect={`/product/${productId}`}
      />
    </div>
  )
}