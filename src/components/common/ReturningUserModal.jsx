import { Modal } from "@shopify/app-bridge-react";

export const ReturningUserModal = ({ show, onClose }) => {
  return (
    <Modal 
      open={show}
      title="Welcome Back!"
      onClose={onClose}
      message="Welcome back, user!"
    />
  )
}