import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { STAGE_IMAGE } from "../../graphql/mutations/stageImage";
import { encodeUrlParams } from "../queryStringHelper";
import axios from "axios";

export const stageImageUpload = () => {
  const [stageImageUploadMutation] = useMutation(STAGE_IMAGE);

  return useCallback(
    async (imageFile) => {
      let { data: { stagedUploadsCreate: results }, error } = await stageImageUploadMutation({
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
        }
      });

      if (!results.userErrors.length) {
        try {
          const { stagedTargets } = results;
          const stagingTarget = stagedTargets[0];
          const { url, parameters } = stagingTarget;
          const key = parameters.filter((param) => param.name == "key")[0].value;
          const urlParams = encodeUrlParams(parameters.slice(1));
          const src = `${url}/${key}${urlParams}`;
          const formData = new FormData();
          parameters.forEach(({ name: paramName, value }) =>
            formData.append(paramName, value)
          );
          formData.append("file", imageFile);
        
          const postRes = await axios.post(url, formData);
          
          return { src };
        } catch (err) {
          console.error(`Image upload error: ${err}`);

          throw([`${err}`]);
        } 
      } else {
        console.error(`Image upload error: ${JSON.stringify(results.userErrors)}`);
        throw(results.userErrors.map((error) => error.message));
      }

      return null;
    },
    [stageImageUploadMutation]
  );
};