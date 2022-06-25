import {
  Form,
  TextField,
  FormLayout,
  Card,
  Page,
  TextContainer,
  TextStyle,
  DropZone,
  Button
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { FeedbackContext } from "../../../app/AppFrame";
import { sanitizeErrorText } from "../../../utils/errorHelper";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_USER_ID
} from "../../../constants";
import axios from "axios";

export const ContactPage = () => {
  const navigate = useNavigate();
  const { showErrorBanner, showToast } = useContext(FeedbackContext);

  const [email, setEmail] = useState();
  const [shopName, setShopName] = useState();
  const [messageBody, setMessageBody] = useState();

  const sendEmail = async () => {
    try {
      await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_USER_ID,
        template_params: {
          reply_to: email,
          shopName,
          messageBody
        }
      });
      setEmail("");
      setShopName("");
      setMessageBody("");
      showToast("Message sent");
    } catch(err) {
      console.error("message send error - ${err}");
      showErrorBanner("Message send error", sanitizeErrorText(err));
    }
  }

  return (
    <Page
      title="Contact Us"
      breadcrumbs={[
        {
          content: "Return",
          accessibilityLabel: "Return to previous page",
          onAction: () => navigate(-1)
        }
      ]}
    >
      <Card>
        <Form>
          <div
            style={{
              padding: "15px"
            }}
          >
            <FormLayout>
              <FormLayout.Group>
                <TextContainer>
                  <TextStyle>
                    Have an issue? Please be as detailed as possible and include any error text.
                  </TextStyle>
                </TextContainer>
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Email"
                  inputMode="email"
                  requiredIndicator
                  value={email}
                  onChange={setEmail}
                />
                <TextField
                  label="Shop Name"
                  value={shopName}
                  onChange={setShopName}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  Label="Message"
                  multiline
                  value={messageBody}
                  onChange={setMessageBody}
                />
              </FormLayout.Group>
              <Button
                onClick={sendEmail}
                disabled={
                  !email
                  || !shopName
                  || !messageBody
                }
              >
                Send
              </Button>
            </FormLayout>
          </div>
        </Form>
    </Card>
    </Page>
  )
}