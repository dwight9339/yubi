import { 
  Form,
  TextField,
  DropZone,
  FormLayout,
  Thumbnail
} from "@shopify/polaris";
import { useState } from "react";

export const TestForm = () => {
  const myObj = {
    word: "banana"
  }
  const [text1, setText1] = useState(myObj.word);
  const [text2, setText2] = useState();
  const [text3, setText3] = useState("Marmot");
  const [img, setImg] = useState();

  return (
    <Form>
      <FormLayout>
        <FormLayout.Group>
          <TextField
            type="text"
            label="Text 1"
            value={text1}
            onChange={setText1}
            autoComplete="off"
          />
          <TextField
            type="text"
            label="Text 2"
            value={text2}
            onChange={setText2}
            autoComplete="off"
          />
          <TextField
            type="text"
            label="Text 3"
            value={text3}
            onChange={setText3}
            autoComplete="off"
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <DropZone
            type="image"
            allowMultiple="off"
            label="Image"
            onDrop={(files, accepted) => {
              setImg(accepted[0])
            }}
          >
              <Thumbnail
                size="large"
                source={
                  img
                    ? window.URL.createObjectURL(img)
                    : ""
                }
              />
          </DropZone>
        </FormLayout.Group>
      </FormLayout>
    </Form>
  )
};