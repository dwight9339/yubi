import { 
  Modal,
  Stack,
  TextContainer,
  TextStyle
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { convertProduct } from "../../utils/apiHooks/convertProduct";
import { getIdFromGid } from "../../utils/gidHelper";

export const ConvertProductModal = ({ 
  show,
  product,
  refetch 
}) => {
  const navigate = useNavigate();
  const convertProductHook = convertProduct(getIdFromGid(product.id));

  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    const results = await convertProductHook(product);
    setLoading(false);

    refetch();
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
            For the Unique Variants Manager app to play nice with a product, 
            the product needs to
            <ol>
              <li>
                Have only one product option. It can be called whatever you like. This is the field
                that holds each unique variant's name.
              </li>
              <li>Have the tag "unique variants".</li>
              <li>Use a designated product page template named "unique-variants".</li>
            </ol>
            Would you like to update this product to make it compatible?
          </TextStyle>
        </TextContainer>
        <br />
        <TextContainer>
          <TextStyle variation="warning">
            Warning: If this product has variants with settings for multiple options (e.g. settings for size <em>and</em> color), then this operation will
            delete all existing variants for the product.
          </TextStyle>
        </TextContainer>
      </Modal.Section>
    </Modal>
  )
}