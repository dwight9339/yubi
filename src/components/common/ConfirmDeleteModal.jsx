import { 
  Modal,
  TextContainer,
  TextStyle
} from "@shopify/polaris";
import { deleteProduct } from "../../utils/apiHooks/deleteProduct";
import { deleteVariant } from "../../utils/apiHooks/deleteVariant";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ConfirmDeleteModal = ({
  show,
  target,
  redirectUrl,
  handleClose,
  showToast,
  showBanner
}) => {
  const navigate = useNavigate();
  const deleteProductHook = deleteProduct();
  const deleteVariantHook = deleteVariant();

  const [processing, setProcessing] = useState(false);

  const handleDelete = async () => {
    try {
      setProcessing(true);
      if (target.__typename === "Product") {
        await deleteProductHook(target.id);
      } else if (target.__typename === "ProductVariant") {
        await deleteVariantHook(target);
      }
      
      setProcessing(false);
      handleClose();
      navigate(redirectUrl, {state: {reload: true}});
      showToast(`Deleted ${target.title}`)
    } catch (error) {
      console.error(error);
      setProcessing(false);
      showBanner("Unable to delete", `Could not delete ${target.title}`, "critical");
      handleClose();
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