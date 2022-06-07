import { 
  Frame,
  Toast,
  Banner,
  List 
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
    content: ""
  };
  const defaultConfirmDeleteContext = {
    show: false,
    target: {},
    redirectUrl: null
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

  const showBanner = (title="", content="", status="info") => {
    setBannerContext({
      show: true,
      title,
      content,
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
            {
              (
                Array.isArray(bannerContext.content)
                && <List>
                  {
                    bannerContext.content.map((item, i) => 
                    <List.Item key={i}>{item}</List.Item>)
                  }
                </List>
              )
              || <p>{bannerContext.content}</p>
            }
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