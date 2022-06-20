import { 
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  Checkbox
} from "@shopify/polaris";
import { useState, useContext, useEffect } from "react";
import { useImageUpload } from "../../utils/hooks/useImageUpload";
import { upsertVariant } from "../../utils/apiHooks/upsertVariant";
import { getIdFromGid } from "../../utils/gidHelper";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FeedbackContext } from "../../app/AppFrame";

export const VariantForm = () => {
  const navigate = useNavigate();
  const upsertVariantHook = upsertVariant();
  const { showBanner, showToast } = useContext(FeedbackContext);
  const { variant, product } = useOutletContext();
  const { imageSrc, imageLoading, component: imageDropZone } = useImageUpload(variant);
  const processType = variant ? "Update" : "Create"

  const [variantName, setVariantName] = useState(variant?.title);
  const [variantDescription, setVariantDescription] = useState(variant?.description?.value || "");
  const [variantPrice, setVariantPrice] = useState(variant?.price || 0);
  const [deleteAfterPurchase, setDeleteAfterPurchase] = useState(Boolean(variant?.deleteAfterPurchase));
  const [processing, setProcessing] = useState(false);

  const getImageData = () => {
    if (!imageSrc) return null;

    return {
      src: imageSrc,
      altText: `Image of ${variantName}`,
      id: variant?.image?.id
    };
  };

  const handleSubmit = async() => {
    const variantInput = {
      variantName,
      variantDescription,
      variantPrice,
      deleteAfterPurchase,
      imageData: getImageData(),
      product: product || variant.product,
      prevVariant: variant
    }
    try {
      setProcessing(true);
      const results = await upsertVariantHook(variantInput);
      const variantId = getIdFromGid(results.id);
      navigate(`/variant/${variantId}`, {state: {reload: Boolean(variant)}});
      showToast(`${`${processType}d`} ${results.title}`);
    } catch(err) {
      const typeSafeError = Array.isArray(err) || typeof(err) === "string";
      showBanner(`${processType} error`, typeSafeError ? err : "", "critical");
      console.error(err);
    } finally {
      setProcessing(false);
    }
  }
  
  return (
    <Card
      title={variant ? `Edit ${variant.title}` : "Create Variant"}
      actions={[
        {
          content: "Cancel",
          accessibilityLabel: `Cancel variant ${processType}`,
          onAction: () => navigate(-1)
        }
      ]}
    >
      <Form
        onSubmit={handleSubmit}
      >
        <FormLayout>
          <FormLayout.Group>
            <TextField
              type="text"
              label="Name"
              value={variantName}
              placeholder="Unique Variant"
              onChange={setVariantName}
            />
            <TextField 
              type="text"
              label="Description"
              value={variantDescription}
              placeholder="A very special variant"
              onChange={setVariantDescription}
              multiline
              autoComplete="off"
            />
            <TextField 
              type="currency"
              label="Price"
              placeholder={variantPrice}
              value={variantPrice}
              onChange={setVariantPrice}
              autoComplete="off"
            />
          </FormLayout.Group>
          <FormLayout.Group>
            {imageDropZone}
          </FormLayout.Group>
          <FormLayout.Group>
            <Checkbox
              label="Delete after purchase"
              checked={deleteAfterPurchase}
              onChange={setDeleteAfterPurchase}
            />
          </FormLayout.Group>
          <Button
            primary
            submit
            loading={processing || imageLoading}
          >
            {processType}
          </Button>
        </FormLayout>
      </Form>
    </Card>
  );
 };