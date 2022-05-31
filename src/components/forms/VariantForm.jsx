import { 
  Card,
  Form,
  FormLayout,
  TextField,
  DropZone,
  Spinner,
  Thumbnail,
  Button
} from "@shopify/polaris";
import { useState } from "react";
import { useImageUpload } from "../../utils/hooks/useImageUpload";
import { updateVariant } from "../../utils/updateVariant";
import { createVariant } from "../../utils/createVariant";

export const VariantForm = ({ variant, productId, onSuccess }) => {
  const updateVariantHook = updateVariant();
  const createVariantHook = createVariant();
  const { imageFile, imageSrc, imageLoading, onImageDrop } = useImageUpload();

  const [variantName, setVariantName] = useState(variant?.name?.value || "");
  const [variantDescription, setVariantDescription] = useState(variant?.description?.value || "");
  const [variantPrice, setVariantPrice] = useState(variant?.price || 0);
  const [processing, setProcessing] = useState(false);

  const getImageData = () => {
    if (!imageSrc) return null;

    return {
      src: imageSrc,
      altText: `Image of ${variantName}`,
      id: variant?.image?.id
    };
  };

  const doUpdate = async () => {
    const result = await updateVariantHook({
        variantName,
        variantDescription,
        variantPrice,
        imageData: getImageData(),
        prevVariant: variant
      });

    return result;
  }

  const doCreate = async () => {
    const result = await createVariantHook({
      variantName,
      variantDescription,
      variantPrice,
      imageData: getImageData(),
      productId
    });
    
    return result;
  }

  const handleSubmit = async() => {
    setProcessing(true);
    const results = variant
      ? await doUpdate()
      : await doCreate();
    setProcessing(false);

    // To do: error checking
    onSuccess(results);
  }
  
  return (
    <Form
      onSubmit={handleSubmit}
    >
      <FormLayout>
        <FormLayout.Group>
          <TextField
            type="text"
            label="Name"
            value={variantName}
            onChange={setVariantName}
          />
          <TextField 
            type="text"
            label="Description"
            value={variantDescription}
            onChange={setVariantDescription}
            multiline
            autoComplete="off"
          />
          <TextField 
            type="currency"
            label="Price"
            value={variantPrice}
            onChange={setVariantPrice}
            autoComplete="off"
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <DropZone
            type="image"
            allowMultiple={false}
            label="Image"
            onDrop={onImageDrop}
            customValidator={(file) => file.type.split("/")[0] == "image"}
          >
            {imageLoading ? (
              <Spinner />
            ) : (
              <Thumbnail
                size="large"
                source={
                  imageFile
                    ? window.URL.createObjectURL(imageFile)
                    : (variant?.image?.url || "")
                }
              />
            )}
          </DropZone>
        </FormLayout.Group>
        <Button
          primary
          submit
          loading={processing || imageLoading}
        >
          {variant ? "Update" : "Create"}
        </Button>
      </FormLayout>
    </Form>
  );
 };