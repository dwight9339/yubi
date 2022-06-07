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

export const useImageUpload = (parentResource) => {
  const stageImageHook = stageImageUpload();
  const { showBanner, showModal } = useContext(FeedbackContext);

  const [imageFile, setImageFile] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [imageLoading, setImageLoading] = useState(false);

  const onDrop = useCallback((files, accepted) => {
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
      setImageSrc(src);
    }
  };

  const validator = (file) => {
    const { type, size } = file;

    if (type !== "image/jpeg" || type !== "image/png") {
      showBanner(
        "Invalid file type", 
        "Please use a jpeg or png image",
        "critical"
      );
      return false;
    } else if (size > 20.971e6) {
      showBanner(
        "File size too large", 
        "Please use an image of less than 20MB",
        "critical"
      );
      return false;
    }

    return true;
  }

  useEffect(() => {
    uploadImage();
  }, [imageFile]);

  const component = useMemo(() =>
    <DropZone
      accept="
        image/jpeg,
        image
      "
      type="image"
      allowMultiple={false}
      label="Image"
      onDrop={onDrop}
      customValidator={validator}
      errorOverlayText="File type not accepted"
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
  , [imageFile]);

  return useMemo(
    () => ({imageSrc, imageLoading, component}), 
    [imageSrc, imageLoading, component]
  );
};