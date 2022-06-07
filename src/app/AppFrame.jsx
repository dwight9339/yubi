import { 
  Frame,
  Toast,
  Banner 
} from "@shopify/polaris";
import { useState, createContext } from "react";
import { ConfirmDeleteModal } from "../components/common/ConfirmDeleteModal";

export const FeedbackContext = createContext();
export const ModalContext = createContext();

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
  const defaultConfirmDeleteContext = {
    show: false,
    target: {},
    redirectUrl: ""
  }

  const [toastContext, setToastContext] = useState(defaultToastContext);
  const [bannerContext, setBannerContext] = useState(defaultBannerContext);
  const [confirmDeleteContext, setConfirmDeleteContext] = useState(defaultConfirmDeleteContext);

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

  const showConfirmDeleteModal = (target, redirectUrl) => {
    setConfirmDeleteContext({
      show: true,
      target,
      redirectUrl
    });
  }

  return (
    <Frame>
      <ConfirmDeleteModal
        show={confirmDeleteContext.show}
        target={confirmDeleteContext.target}
        redirectUrl={confirmDeleteContext.redirectUrl}
        handleClose={() => {
          setConfirmDeleteContext(defaultConfirmDeleteContext);
        }}
        showBanner={showBanner}
        showToast={showToast}
      />
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
        <ModalContext.Provider value={{
          showConfirmDeleteModal
        }}>
          {children}
        </ModalContext.Provider>
      </FeedbackContext.Provider>
    </Frame>
  )
}