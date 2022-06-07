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
import { IMAGE_SIZE_LIMIT, SUPPORTED_IMAGE_TYPES } from "../../constants";

export const useImageUpload = (parentResource) => {
  const stageImageHook = stageImageUpload();
  const { showBanner } = useContext(FeedbackContext);

  const [imageFile, setImageFile] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [imageLoading, setImageLoading] = useState(false);

  const onDrop = useCallback((files, accepted) => {
    if (!accepted.length) return;

    setImageLoading(true);
    const file = accepted[0];

    if (file.size > 10e6) {
      showBanner("Image size too large", "File size limited to 20MB", "warning");
      setImageLoading(false);
      return;
    }

    setImageFile(file);
  });

  const uploadImage = async () => {
    if (!imageFile) return;

    try {
      const result = await stageImageHook(imageFile);

      setImageSrc(result?.src);
    } catch(err) {
      showBanner("Image upload error", err, "critical");
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