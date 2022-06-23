import { 
  Modal,
  Banner,
  List
} from "@shopify/polaris";
import { addUvTag } from "../../utils/apiHooks/addUvTag";
import { useState, useContext, useMemo } from "react";
import { FeedbackContext } from "../../app/AppFrame";
import { useModalErrorBanner } from "../../utils/hooks/useModalErrorBanner";
import { sanitizeErrorText } from "../../utils/errorHelper";

export const AddUvTagModal = ({ show, onClose, productId, refetch }) => {
  const addTagHook = addUvTag();
  const { showToast } = useContext(FeedbackContext);
  const { errorBanner, showErrorBanner } = useModalErrorBanner();

  const [processing, setProcessing] = useState(false);

  const doAddTag = async () => {
    setProcessing(true);
    try {
      await addTagHook(productId);
      refetch();
      showToast("'unique variants' tag added");
    } catch(err) {
      console.error(`UV tag add error - ${err}`);
      showErrorBanner(sanitizeErrorText(err));
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