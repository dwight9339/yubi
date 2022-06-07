import { 
  Frame,
  Toast,
  Banner 
} from "@shopify/polaris";
import { useState, createContext } from "react";

export const FeedbackContext = createContext();

export const AppFrame = ({ children }) => {
  const defaultToastContext = {
    show: false,
    content: "",
    duration: 3000,
    error: false
  };
  const defaultBannerContext = {
    show: false,
    title: "",
    status: "info",
    text: ""
  };

  const [toastContext, setToastContext] = useState(defaultToastContext);
  const [bannerContext, setBannerContext] = useState(defaultBannerContext);

  const showToast = (content="", duration=3000, error=false) => {
    setToastContext({
      show: true,
      content,
      duration,
      error
    });
  }

  const showBanner = (title="", text="", status="info") => {
    setBannerContext({
      show: true,
      title,
      text,
      status
    });
  }

  return (
    <Frame>
      {
        toastContext.show
          ? <Toast
            content={toastContext.content}
            duration={toastContext.duration}
            error={toastContext.error}
            onDismiss={() => setToastContext(defaultToastContext)}
          />
          : null
      }
      {
        bannerContext.show
          ? <Banner
            title={bannerContext.title}
            status={bannerContext.status}
            onDismiss={() => setBannerContext(defaultBannerContext)}
          >
            <p>
              {bannerContext.text}
            </p>
          </Banner>
          : null
      }
      <FeedbackContext.Provider value={{
        showToast,
        showBanner
      }}>
        {children}
      </FeedbackContext.Provider>
    </Frame>
  )
}