import { Modal } from "@shopify/app-bridge-react";

export const ReturningUserModal = ({ show, onClose }) => {
  return (
    <Modal 
      open={show}
      title="Welcome Back!"
      onClose={onClose}
      message="Thank you for giving us another shot. Products that have
      been updated may no longer be compatible and may need to be converted.
      Any variants you wish to have deleted after purchase will need to be 
      marked as such again."
      primaryAction={{
        content: "Ok",
        onAction: onClose
      }}
    />
  )
}