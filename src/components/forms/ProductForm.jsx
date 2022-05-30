import { 
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
 import { updateProduct } from "../../utils/updateProduct";
 import { createProduct } from "../../utils/createProduct";

export const ProductForm = ({ product, onSuccess }) => {
  const productUpdateHook = updateProduct();
  const productCreateHook = createProduct();
  const { imageFile, imageSrc, imageLoading, onImageDrop } = useImageUpload();

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

  const getFormData = () => ({
    productTitle,
    productDescription,
    productType,
    productTags,
    imageData: getImageData(),
    prevProduct: product
  });

  const doUpdate = async () => {
    const formData = getFormData();
    const results = await productUpdateHook(formData);

    return results;
  };

  const doCreate = async () => {
    const formData = getFormData();
    const results = await productCreateHook(formData);

    return results;
  }

  const handleSubmit = async () => {
    setProcessing(true);
    const results = product
      ? await doUpdate()
      : await doCreate();
    setProcessing(false);

    // To do: error checking
    onSuccess();
  }

  return (
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
                    : (product?.featuredImage?.url || "")
                }
              />
            )}
          </DropZone>
        </FormLayout.Group>
        <Button
          primary
          submit
          loading={processing || imageLoading}
          disabled={!productTitle}
        >
          {product ? "Update" : "Create"}
        </Button>
      </FormLayout>
    </Form>
  )
}