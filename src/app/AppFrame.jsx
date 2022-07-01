import { 
  Frame,
  Toast,
  Banner,
  List,
  Button,
  Popover,
  ActionList
} from "@shopify/polaris";
import {
  QuestionMarkInverseMajor
} from '@shopify/polaris-icons';
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmDeleteModal } from "../components/modals/ConfirmDeleteModal";
import { GENERIC_ERROR_TEXT } from "../constants";

export const FeedbackContext = createContext();
export const ModalContext = createContext();

export const AppFrame = ({ children }) => {
  const navigate = useNavigate();

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
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);

  const showToast = (content="", duration=3000, error=false) => {
    setToastContext({
      show: true,
      content,
      duration,
      error
    });
  }

  const showBanner = (title="", content="", status="info", error=false) => {
    setBannerContext({
      show: true,
      title,
      content,
      status
    });
  }

  const showErrorBanner = (title="", errors=[]) => {
    setBannerContext({
      show: true,
      title,
      content: errors,
      error: true,
      status: "critical"
    })
  }

  const showConfirmDeleteModal = (target, redirectUrl) => {
    setConfirmDeleteContext({
      show: true,
      target,
      redirectUrl
    });
  }

  const toggleHelpMenuOpen = () => setHelpMenuOpen(!helpMenuOpen);

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
            {bannerContext.error && <p>{GENERIC_ERROR_TEXT}</p>}
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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "10px"
        }}
      >
        
        <Popover
          activator={
            <Button
              plain
              icon={QuestionMarkInverseMajor}
              onClick={toggleHelpMenuOpen}
            />
          }
          active={helpMenuOpen}
          onClose={() => setHelpMenuOpen(false)}
        >
          <ActionList
            actionRole="menuItem"
            items={[
              {
                content: "FAQ",
                accessibilityLabel: "Link to FAQ page",
                onAction: () => {
                  navigate("/faq");
                  setHelpMenuOpen(false);
                }
              },
              {
                content: "Documentation",
                accessibilityLabel: "Link to documentation",
                onAction: () => {
                  navigate("/documentation");
                  setHelpMenuOpen(false);
                }
              },
              {
                content: "Contact Us",
                accessibilityLabel: "Link to contact page",
                onAction: () => {
                  navigate("/contact");
                  setHelpMenuOpen(false);
                }
              }
            ]}
          />
        </Popover>
      </div>
      <FeedbackContext.Provider value={{
        showToast,
        showBanner,
        showErrorBanner
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