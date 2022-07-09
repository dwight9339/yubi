import { Modal, Banner, TextContainer, TextStyle } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useMemo } from "react";
import { convertProduct } from "../../utils/apiHooks/convertProduct";
import { getIdFromGid } from "../../utils/gidHelper";
import { FeedbackContext } from "../../app/AppFrame";
import { useModalErrorBanner } from "../../utils/hooks/useModalErrorBanner";
import { sanitizeErrorText } from "../../utils/errorHelper";

export const ConvertProductModal = ({ show, product, refetch }) => {
  const navigate = useNavigate();
  const convertProductHook = convertProduct(getIdFromGid(product.id));
  const { showToast } = useContext(FeedbackContext);
  const { errorBanner, showErrorBanner } = useModalErrorBanner();

  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    try {
      setLoading(true);
      await convertProductHook(product);
      showToast("Product converted");
      refetch();
    } catch (err) {
      console.error(`Product conversion error - ${err || err.message}`);
      showErrorBanner(sanitizeErrorText(err));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Modal
      open={show}
      title="Convert Product?"
      primaryAction={{
        content: "Convert",
        accessibilityLabel: "Convert product",
        onAction: handleConvert,
        loading,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          accessibilityLabel: "Cancel conversion",
          onAction: handleClose,
        },
      ]}
      onClose={handleClose}
    >
      {errorBanner}
      <Modal.Section>
        <TextContainer>
          <TextStyle>
            It looks like this product is incompatible with Yubi. To be
            compatible, it must have only one option. This will hold the
            variant's name. Would you like to convert this product to make it
            compatible?
          </TextStyle>
        </TextContainer>
        <br />
        <TextContainer>
          <TextStyle variation="warning">
            Warning: This will delete all variants that currently exist on the
            product.
          </TextStyle>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};
