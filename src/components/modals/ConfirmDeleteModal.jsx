import { 
  Modal,
  TextContainer,
  TextStyle,
  Banner
} from "@shopify/polaris";
import { deleteProduct } from "../../utils/apiHooks/deleteProduct";
import { deleteVariant } from "../../utils/apiHooks/deleteVariant";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sanitizeErrorText } from "../../utils/errorHelper";
import { useModalErrorBanner } from "../../utils/hooks/useModalErrorBanner";

export const ConfirmDeleteModal = ({
  show,
  target,
  redirectUrl,
  handleClose,
  showToast
}) => {
  const navigate = useNavigate();
  const deleteProductHook = deleteProduct();
  const deleteVariantHook = deleteVariant();

  const [processing, setProcessing] = useState(false);

  const { errorBanner, showErrorBanner } = useModalErrorBanner();

  const handleDelete = async () => {
    try {
      setProcessing(true);
      if (target.__typename === "Product") {
        await deleteProductHook(target.id);
      } else if (target.__typename === "ProductVariant") {
        await deleteVariantHook(target);
      }
      handleClose();
      navigate(redirectUrl, {state: {reload: true}});
      showToast(`Deleted ${target.title}`)
    } catch (err) {
      showErrorBanner(sanitizeErrorText(err));
      console.error(`delete error - ${err}`);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <Modal
      title="Confirm delete"
      open={show}
      primaryAction={{
        content: "Delete",
        accessibilityLabel: `Delete ${target.title}`,
        onAction: handleDelete,
        destructive: true,
        loading: processing
      }}
      secondaryActions={[
        {
          content: "Cancel",
          accessibilityLabel: "Cancel delete",
          onAction: handleClose
        }
      ]}
      onClose={handleClose}
      
    >
      {errorBanner}
      <Modal.Section>
        <TextContainer>
          <TextStyle>
            Are you sure you want to delete {target.title}?
          </TextStyle>
        </TextContainer>
      </Modal.Section>
      <Modal.Section>
        <TextContainer>
          <TextStyle variation="negative">
            This action cannot be undone
          </TextStyle>
        </TextContainer>
      </Modal.Section>
    </Modal>
  )
};