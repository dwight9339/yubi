import { stageImageUpload } from "../apiHooks/stageImageUpload";
import { 
  useState, 
  useCallback, 
  useEffect, 
  useMemo, 
  useContext 
} from "react";
import { 
  DropZone,
  Spinner,
  Thumbnail
} from "@shopify/polaris";
import { FeedbackContext } from "../../app/AppFrame";
import {SUPPORTED_IMAGE_TYPES } from "../../constants";
import { sanitizeErrorText } from "../errorHelper";

export const useImageUpload = (parentResource) => {
  const stageImageHook = stageImageUpload();
  const { showErrorBanner } = useContext(FeedbackContext);

  const [imageFile, setImageFile] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [imageLoading, setImageLoading] = useState(false);

  const onDrop = useCallback((files, accepted) => {
    if (!accepted.length) return;
    setImageFile(accepted[0]);
  });

  const uploadImage = async () => {
    if (!imageFile) return;

    try {
      setImageLoading(true);
      const src = await stageImageHook(imageFile);
      setImageSrc(src);
    } catch(err) {
      showErrorBanner("Image upload error", sanitizeErrorText(err));
      setImageFile(undefined);
    } finally {
      setImageLoading(false);
    }
  };

  const validator = (file) => {
    const [type, subtype] = file.type.split("/");

    return type === "image" && SUPPORTED_IMAGE_TYPES.includes(subtype);
  }

  useEffect(() => {
    uploadImage();
  }, [imageFile]);

  const component = useMemo(() =>
    <DropZone
      type="image"
      allowMultiple={false}
      label="Image"
      onDrop={onDrop}
      customValidator={validator}
    >
      {imageLoading ? (
        <Spinner />
      ) : (
        <Thumbnail
          size="large"
          source={
            imageFile
              ? window.URL.createObjectURL(imageFile)
              : (
                  parentResource?.featuredImage?.url 
                  || parentResource?.image?.url
                  || ""
                )
          }
        />
      )}
    </DropZone>
  , [imageLoading, imageFile]);

  return useMemo(
    () => ({imageSrc, imageLoading, component}), 
    [imageSrc, imageLoading, component]
  );
};