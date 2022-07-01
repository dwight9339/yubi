import { 
  Page,
  Card
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const FaqPage = () => {
  const navigate = useNavigate();

  const [goBackFailedFlag, setGoBackFailedFlag] = useState(false);

  useEffect(() => {
    if (goBackFailedFlag) navigate("/");
  }, [goBackFailedFlag]);

  return (
    <Page
      title="FAQ"
      breadcrumbs={[
        {
          content: "Back",
          accessibilityLabel: "Return to previous page",
          onAction: () => {
            navigate(-1);
            setGoBackFailedFlag(true);
          }
        }
      ]}
    >
      <Card>

      </Card>
    </Page>
  )
}