import { stageImageUpload } from "../stageImageUpload";
import { useState, useCallback, useEffect, useMemo } from "react";

export const useImageUpload = () => {
  const stageImageHook = stageImageUpload();

  const [imageFile, setImageFile] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [imageLoading, setImageLoading] = useState(false);

  const onImageDrop = useCallback((files, accepted) => {
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

  useEffect(() => {
    uploadImage();
  }, [imageFile]);

  return useMemo(
    () => ({imageFile, imageSrc, imageLoading, onImageDrop}), 
    [imageFile, imageSrc, imageLoading]
  );
};