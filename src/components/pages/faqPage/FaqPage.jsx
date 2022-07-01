import { 
  Page,
  Card
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { QABlock } from "./QABlock";

import { items } from "../../../assets/faqData.json";

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
        <div
          style={{
            padding: "10px"
          }}
        >
          {items.map((item, i) => {
            return <QABlock key={i} item={item} />
          })}
        </div>
      </Card>
    </Page>
  )
}