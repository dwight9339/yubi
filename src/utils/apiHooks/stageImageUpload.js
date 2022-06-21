import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { STAGE_IMAGE } from "../../graphql/mutations/stageImage";
import { handleUserErrors } from "../errorHelper";
import axios from "axios";

export const stageImageUpload = () => {
  const [stageImageUploadMutation] = useMutation(STAGE_IMAGE);

  return useCallback(async (imageFile) => {
    let stagedTarget
    
    await stageImageUploadMutation({
      variables: {
        input: [
          {
            resource: "PRODUCT_IMAGE",
            filename: imageFile.name,
            mimeType: imageFile.type,
            fileSize: imageFile.size.toString(),
            httpMethod: "POST",
          },
        ],
      },
      onCompleted: (data) => {
        handleUserErrors(data);

        stagedTarget = data.stagedUploadsCreate.stagedTargets[0];
      }
    });

    const { url, parameters } = stagedTarget;
    const urlParams = new URLSearchParams(
      Object.fromEntries(
        parameters.map(({ name, value }) => [name, value])
      )
    );
    const key = urlParams.get("key");
    urlParams.delete("key");
    const src = `${url}/${key}?${urlParams.toString()}`;
    const formData = new FormData();
    parameters.forEach(({ name: paramName, value }) =>
      formData.append(paramName, value)
    );
    formData.append("file", imageFile);
    
    await axios.post(url, formData);
    
    return src;
  });
};