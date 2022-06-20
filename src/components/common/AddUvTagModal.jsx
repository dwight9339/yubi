import { 
  Modal,
  Banner,
  List
} from "@shopify/polaris";
import { addUvTag } from "../../utils/apiHooks/addUvTag";
import { useState, useContext, useMemo } from "react";
import { FeedbackContext } from "../../app/AppFrame";
import { GENERIC_ERROR_TEXT } from "../../constants";

export const AddUvTagModal = ({ show, onClose, productId }) => {
  const addTagHook = addUvTag();
  const { showToast } = useContext(FeedbackContext);
  const [showError, setShowError] = useState(false);
  const [processing, setProcessing] = useState(false);

  const errorBanner = useMemo(() => {
    if (!showError) return null;

    return (
      <Banner status="critical">
        <p>{GENERIC_ERROR_TEXT}</p>
      </Banner>
    );
  }, [showError])

  const doAddTag = async () => {
    setShowError(false);
    setProcessing(true);
    try {
      await addTagHook(productId);
      onClose();
      showToast("'unique variants' tag added");
    } catch(err) {
      console.error(`UV tag add error - ${err}`);
      setShowError(true);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <Modal
      open={show}
      title="Add Unique Variants Tag?"
      onClose={onClose}
      primaryAction={{
        content: "Add tag",
        onAction: doAddTag,
        loading: processing
      }}
      secondaryActions={[
        {
          content: "No thanks",
          onAction: onClose
        }
      ]}
      noScroll
    >
      {errorBanner}
      <Modal.Section>
      We noticed that this product does not have the 'unique variants' tag.
      Without this tag, this product will not appear in the products list upon
      opening the Unique Variants Manager app. Would you like to add it now?
      </Modal.Section>
    </Modal>
  )
}