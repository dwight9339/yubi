import { 
  Modal,
  Heading
} from "@shopify/polaris";
import { useState, useLayoutEffect, useRef } from "react";
import { paragraphs, images, pages } from "../../assets/walkthroughData.json";
import { ProductPhoto } from "../common/ProductPhoto";

const PageContents = ({ page }) => {
  const ref = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    setCardWidth(ref.current.offsetWidth);
  }, []);

  return (
    <div
      ref={ref}
    >
      {
        page.map(([elementType, element]) => {
          let elementComponent = null;

          if (elementType === "header") {
            elementComponent = <Heading>{element}</Heading>;
          } else if (elementType === "paragraph") {
            elementComponent = <p>{paragraphs[element]}</p>;
          } else if (elementType === "image") {
            elementComponent = <ProductPhoto image={images[element]} cardWidth={cardWidth} />;
          }

          return (
            <div
              style={{
                marginTop: "10px"
              }}
            >
              {elementComponent}
            </div>
          )
        })
      }
    </div>
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