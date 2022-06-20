import { 
  Modal,
  Stack,
  TextContainer,
  TextStyle
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { convertProduct } from "../../utils/apiHooks/convertProduct";
import { getIdFromGid } from "../../utils/gidHelper";
import { FeedbackContext } from "../../app/AppFrame";

export const ConvertProductModal = ({ 
  show,
  product,
  refetch 
}) => {
  const navigate = useNavigate();
  const convertProductHook = convertProduct(getIdFromGid(product.id));
  const { showBanner, showToast } = useContext(FeedbackContext);

  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    try {
      setLoading(true);
      const results = await convertProductHook(product);
      showToast("Product converted");
      navigate(
        `/product/${getIdFromGid(product.id)}`,
        {state: {reload: true}}
      );
    } catch(err) {
      showBanner(
        "Product conversion error", 
        Array.isArray(err) 
          ? err
          : `${err}`,
        "critical"
      )
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    navigate("/");
  }

  return (
    <Modal
      open={show}
      title="Convert Product?"
      primaryAction={{
        content: "Convert",
        accessibilityLabel: "Convert product",
        onAction: handleConvert,
        loading
      }}
      secondaryActions={[
        {
          content: "Cancel",
          accessibilityLabel: "Cancel conversion",
          onAction: handleClose
        }
      ]}
      onClose={handleClose}
    >
      <Modal.Section>
        <TextContainer>
          <TextStyle>
            It looks like this product is incompatible with Unique Variants Manager.
            To be compatible, it must have only one option for variant name. Would 
            you like to convert this product to make it compatible?
          </TextStyle>
        </TextContainer>
        <br />
        <TextContainer>
          <TextStyle variation="warning">
            Warning: This will delete all variants that currently exist on the product.
          </TextStyle>
        </TextContainer>
      </Modal.Section>
    </Modal>
  )
}