import { useState, useMemo } from "react";
import { Banner, List } from "@shopify/polaris";
import { GENERIC_ERROR_TEXT } from "../../constants";

export const useModalErrorBanner = () => {
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState([]);

  const errorBanner = useMemo(() => {
    if (!showError) return null;

    return (
      <Banner 
        status="critical"
        onDismiss={() => setShowError(false)}
      >
        <p>{GENERIC_ERROR_TEXT}</p>
        <List>
          {
            errors.map((item, i) => 
            <List.Item key={i}>{item}</List.Item>)
          }
        </List>
      </Banner>
    );
  }, [showError]);

  const showErrorBanner = (errs) => {
    setErrors(errs);
    setShowError(true);
  }

  return useMemo(() => ({errorBanner, showErrorBanner}), [showError, errors])
}