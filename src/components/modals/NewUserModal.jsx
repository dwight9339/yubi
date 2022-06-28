import { 
  Modal,
  Heading
} from "@shopify/polaris";
import { useEffect } from "react";
import { useState } from "react";
import { paragraphs, images, pages } from "../../assets/walkthroughData.json";

const PageImage = ({ image }) => {
  return (
    <img
      src={image.src}
      alt={image.alt}
    />
  )
}

const PageContents = ({ page }) => {
  return (
    <>
      {
        page.map(([elementType, element]) => {
          if (elementType === "header") {
            return <Heading>{element}</Heading>;
          } else if (elementType === "paragraph") {
            return <p>{paragraphs[element]}</p>;
          } else if (elementType === "image") {
            return <PageImage image={images[element]} />;
          }
        })
      }
    </>
  )
}

export const NewUserModal = ({ show, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <Modal 
      open={show}
      title="Walkthrough"
      onClose={onClose}
      noScroll
      primaryAction={{
        content: currentPage === pages.length - 1
          ? "Done"
          : "Next"
        ,
        accessibilityLabel: currentPage === pages.length - 1
          ? "Exit walkthrough"
          : "Go to next page",
        outline: true,
        onAction: () => {
          if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
          } else {
            onClose();
          }
        }
      }}
      secondaryActions={[
        {
          content: "Go back",
          accessibilityLabel: "Go to previous page",
          outline: true,
          disabled: currentPage === 0,
          onAction: () => setCurrentPage(currentPage - 1)
        }
      ]}
    >
      <Modal.Section>
        <PageContents page={pages[currentPage]} />
      </Modal.Section>
    </Modal>
  )
}