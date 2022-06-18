import { Modal } from "@shopify/app-bridge-react";

export const NewUserModal = ({ show, onClose }) => {
  return (
    <Modal 
      open={show}
      title="Welcome!"
      onClose={onClose}
      message="Welcome, new user"
    />
  )
}