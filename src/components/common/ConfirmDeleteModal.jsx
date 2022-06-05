import { 
  Modal,
  TextContainer,
  TextStyle
} from "@shopify/polaris";

export const ConfirmDeleteModal = ({
  show,
  resourceName,
  handleDelete,
  handleClose
}) => {
  return (
    <Modal
      title="Confirm delete"
      open={show}
      primaryAction={{
        content: "Delete",
        accessibilityLabel: `Delete ${resourceName}`,
        onAction: handleDelete
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
            Are you sure you want to delete {resourceName}?
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