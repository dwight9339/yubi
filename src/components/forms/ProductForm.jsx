import { 
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  Stack
} from "@shopify/polaris";
import { useState, useContext } from "react";
import { useImageUpload } from "../../utils/hooks/useImageUpload";
import { upsertProduct } from "../../utils/apiHooks/upsertProduct";
import { getIdFromGid } from "../../utils/gidHelper";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FeedbackContext } from "../../app/AppFrame";
import { sanitizeErrorText } from "../../utils/errorHelper";

export const ProductForm = () => {
  const upsertProductHook = upsertProduct();
  const navigate = useNavigate();
  const { showErrorBanner, showToast } = useContext(FeedbackContext);
  const { product } = useOutletContext();
  const { imageSrc, imageLoading, component: imageDropZone } = useImageUpload(product);
  const processType = product ? "Update" : "Create";

  const [productTitle, setProductTitle] = useState(product?.title);
  const [productDescription, setProductDescription] = useState(product?.description);
  const [productType, setProductType] = useState(product?.productType);
  const [productTags, setProductTags] = useState(product?.tags?.join());
  const [processing, setProcessing] = useState(false);

  const getImageData = () => {
    if (!imageSrc) return null;

    return {
      src: imageSrc,
      altText: `Image of ${productTitle}`,
      id: product?.featuredImage?.id
    };
  }

  const handleSubmit = async () => {
    const productInput = {
      productTitle,
      productDescription,
      productType,
      productTags,
      imageData: getImageData(),
      prevProduct: product
    };

    try {
      setProcessing(true);
      const results = await upsertProductHook(productInput);
      const productId = getIdFromGid(results.id);
      navigate(`/product/${productId}`, {state: {reload: Boolean(product)}});
      showToast(`${`${processType}d`} ${results.title}`);
    } catch(err) {
      showErrorBanner(`${processType} error`, sanitizeErrorText(err));
      console.error(`product upsert error - ${err}`);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <Card
      title={`${processType} ${product ? product.title : "product"}`}
      actions={[
        {
          content: "Cancel",
          accessibilityLabel: `Cancel product ${processType}`,
          onAction: () => navigate("..")
        }
      ]}
    >
      <div
        style={{
          width: "90%",
          margin: "auto",
          paddingBottom: "20px",
          paddingTop: "10px"
        }}
      >
        <Form
          onSubmit={handleSubmit}
        >
          <FormLayout>
            <FormLayout.Group>
              <TextField 
                type="text"
                label="Title"
                value={productTitle}
                onChange={setProductTitle}
                autoComplete="off"
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField 
                type="text"
                label="Description"
                value={productDescription}
                onChange={setProductDescription}
                multiline
                autoComplete="off"
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField 
                type="text"
                label="Type"
                value={productType}
                onChange={setProductType}
                autoComplete="off"
              />
              <TextField 
                type="text"
                label="Tags (Comma-separated)"
                value={productTags}
                onChange={setProductTags}
                autoComplete="off"
              />
            </FormLayout.Group>
            <FormLayout.Group>
              {imageDropZone}
            </FormLayout.Group>
            <Button
              primary
              submit
              loading={processing}
              disabled={
                !productTitle
                || productTitle === ""
                || imageLoading
              }
            >
              {product ? "Update" : "Create"}
            </Button>
          </FormLayout>
        </Form>
      </div>
    </Card>
  )
}