import { 
  Modal,
  Banner,
  TextContainer,
  TextStyle
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useMemo } from "react";
import { convertProduct } from "../../utils/apiHooks/convertProduct";
import { getIdFromGid } from "../../utils/gidHelper";
import { FeedbackContext } from "../../app/AppFrame";
import { GENERIC_ERROR_TEXT } from "../../constants";

export const ConvertProductModal = ({ 
  show,
  product,
  refetch 
}) => {
  const navigate = useNavigate();
  const convertProductHook = convertProduct(getIdFromGid(product.id));
  const { showToast } = useContext(FeedbackContext);

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const errorBanner = useMemo(() => {
    if (!showError) return null;

    return (
      <Banner status="critical">
        <p>{GENERIC_ERROR_TEXT}</p>
      </Banner>
    )
  }, [showError]);

  const handleConvert = async () => {
    try {
      setShowError(false);
      setLoading(true);
      await convertProductHook(product);
      showToast("Product converted");
      refetch();
      // navigate(
      //   `/product/${getIdFromGid(product.id)}`,
      //   {state: {reload: true}}
      // );
    } catch(err) {
      console.error(`Product conversion error - ${err || err.message}`);
      setShowError(true);
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
      {errorBanner}
      <Modal.Section>
        <TextContainer>
          <TextStyle>
            It looks like this product is incompatible with Unique Variants Manager.
            To be compatible, it must have only one option. This will hold the variant's
            name. Would you like to convert this product to make it compatible?
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