import { VariantForm } from "../common/VariantForm";

export const VariantEdit = ({ variant, editComplete }) => {
  return (
    <VariantForm
      variant={variant}
      onSuccess={editComplete}
    />
  );
};