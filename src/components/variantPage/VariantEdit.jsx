import { 
  Form,
  FormLayout,
  TextField,
  DropZone,
  Spinner,
  Thumbnail,
  Button
 } from "@shopify/polaris";
 import { useState, useCallback, useEffect, useMemo } from "react";
 import { stageImageUpload } from "../../utils/stageImageUpload";
 import { updateVariant } from "../../utils/updateVariant";

export const VariantEdit = ({ variant, editComplete }) => {
  const stageImageHook = stageImageUpload();
  const updateVariantHook = updateVariant();

  const [variantName, setVariantName] = useState(variant.name.value);
  const [variantDescription, setVariantDescription] = useState(variant.description.value);
  const [variantPrice, setVariantPrice] = useState(variant.price);
  const [imageFile, setImageFile] = useState();
  const [imageData, setImageData] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const onimageDrop = useCallback((files, accepted) => {
    if (accepted.length) {
      setImageFile(accepted[0]);
    }
  });

  const uploadImage = async () => {
    if (!imageFile) return;
    setImageLoading(true);
    const result = await stageImageHook(imageFile);
    setImageLoading(false);

    if (result) {
      const { src } = result;
      setImageData({
        src,
        altText: `Image of ${variant.title}`,
        id: variant.image.id
      });
      console.log(`Image data: ${JSON.stringify(imageData)}`);
    }
  };

  const onSubmit = async () => {
    setProcessing(true);

    const result = await updateVariantHook({
      variantName,
      variantDescription,
      variantPrice,
      imageData,
      prevVariant: variant
    });

    editComplete();
  };

  useEffect(() => {
    uploadImage()
  }, [imageFile]);

  return (
    <Form
      onSubmit={onSubmit}
    >
      <FormLayout>
        <FormLayout.Group>
          <TextField
            type="text"
            label="Variant Name"
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
            label="Variant Image"
            onDrop={onimageDrop}
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
                    : variant.image.url
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
          Update
        </Button>
      </FormLayout>
    </Form>
  );
};