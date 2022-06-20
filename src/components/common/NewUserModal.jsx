import { 
  Modal,
  TextContainer,
  TextStyle
} from "@shopify/polaris";
import { useState } from "react";

const page1Content = (
  <>
    <p>
    Welcome to Unique Variants Manager! 
    This app helps you create and manage groups of unique products 
    as variants of an archetypal, parent product. 
    Let’s do a quick walkthrough with a real-world example.
    </p>
  </>
);

const page2Content = (
  <>
    <p>
    Say you’ve just finished a batch of hand-carved wooden spoons, 
    each with its own unique style and personality, and now you’re 
    ready to share them with the world. Rather than create a product 
    page for each individual spoon, it’s much easier and more efficient 
    to create a parent product with a general description and list each 
    spoon as a variant. That way we can use the parent product’s 
    description to talk about the similarities of the spoons (wooden, 
    spoony, and hand-crafted with love) and a description metafield on 
    each variant to talk about what makes each one unique (roasted 
    mahogany with tiny knot on the handle). This also helps improve site 
    SEO since we’re not constantly adding and removing new product pages 
    for our one-of-a-kind handicrafts and we now have a landing page  
    for customers looking for a particular type of product.
    </p>
  </>
);

const page3Content = (
  <>
    <p>
    To create a new product click “Create new product” on the products 
    list page. Fill out the form with details about your parent product. 
    We can add a generic image for the product to be shown on collection pages.
    </p>
    <div className="walkthrough-photo-container">
      [screenshot of filled out product form]
    </div>
    <p>
    Click “Create” to submit.
    </p>
  </>
);



export const NewUserModal = ({ show, onClose }) => {
  const pages = [
    page1Content,
    page2Content,
    page3Content
  ];
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <Modal 
      open={show}
      title="Walkthrough"
      onClose={onClose}
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
        {pages[currentPage]}
      </Modal.Section>
    </Modal>
  )
}