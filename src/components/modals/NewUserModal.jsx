import { 
  Modal,
  TextContainer,
  TextStyle
} from "@shopify/polaris";
import { useState } from "react";

const walkthroughImageStyles = {
  width: 560,
  height: 500,
  backgroundColor: "rgb(247, 231, 178)"
}

const page1Content = (
  <>
    <p>
    Welcome to Unique Variants Manager! 
    This app helps you create and manage groups of unique products 
    as variants of a generic parent product. 
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
    <div style={walkthroughImageStyles}>
      [screenshot of filled out product form]
    </div>
    <p>
    Click “Create” to submit.
    </p>
  </>
);

const page4Content = (
  <>
    <p>
    Next we’ll see the product info page for our newly created parent product. 
    Let’s go ahead and start adding our spoons! Click “Create new variant” and 
    fill out the form. We can create a unique name and description for this 
    particular spoon. Don’t forget to include a picture!
    </p>
    <div style={walkthroughImageStyles}>
      [screenshot of filled out product form]
    </div>
    <p>
    Toward the bottom of the form we see the option “Delete after purchase”. 
    Checking this will enable a webhook that deletes this variant when a customer 
    places a confirmed order for it.
    </p>
    <div style={walkthroughImageStyles}>
      [close shot with checkbox highlighted]
    </div>
    <p>Click Create.</p>
  </>
);

const page5Content = (
  <>
    <p>
    We see the spoon has been added to the product’s list of variants. Let’s 
    repeat the previous step to add the rest of our spoons.
    </p>
    <div style={walkthroughImageStyles}>
      [screenshot of product page with several variants]
    </div>
    <p>Perfect! Now we’re ready to show off our variants in our store.</p>
  </>
);

const page6Content = (
  <>
    <p>
    Head over to the theme customizer. Click the page dropdown at the top, 
    select Products, then click “Create template”. Name it Unique Variants 
    and click Create template again.
    </p>
    <p>
    Looking at the product information section, you’ll see the standard variant 
    picker which lists all available product options. In this case, it shows 
    the names we’ve given each of our unique spoon variants. Unique Variants 
    Manager stores these variant names as values for an option called Title. 
    This way works for displaying our variants but this app also includes a 
    special variant picker which displays thumbnail images of our variants 
    rather than just their names.
    </p>
    <p>
    To use this, first remove the standard variant picker block by selecting 
    Variant picker under the Product information section, then click remove 
    block at the bottom of the block settings section.
    </p>
    <div style={walkthroughImageStyles}>
      [screenshot showing product page customizer with Variant picker pointed 
      out on the left and Remove block pointed out on the right]
    </div>
  </>
);

const page7Content = (
  <>
    <p>
    Then, click add block in the Product information section and select Unique 
    Variant Picker from the Apps section to add our unique variant picker block. 
    Click and drag to place it between the Price and Quantity selector blocks 
    where the old variant picker block was located. Now you should see a grid of 
    thumbnails showing off your spoons! Feel free to tweak the block settings at 
    this point to get the grid looking just right.
    </p>
    <div style={walkthroughImageStyles}>
      [screenshot of app block and settings]
    </div>
    <p>
    Now, finally, let’s add some blocks to display each variant’s name and description.
    </p>
  </>
);

const page8Content = (
  <>
    <p>
    Click Add block again and select the Variant Name block from the Apps section. 
    Click and drag to your desired location within the Product information section. 
    Do the same with the Variant description block.
    </p>
    <div style={walkthroughImageStyles}>
      [screenshot of product page with variant name, variant description, and unique
      variant picker blocks added.]
    </div>
    <p>
    Clicking a different variant populates each block with that variant’s details. 
    </p>
  </>
);

const page9Content = (
  <>
    <p>
    Congratulations, you’re all set up to start selling your one-of-a-kind products!
    </p>
  </>
)

export const NewUserModal = ({ show, onClose }) => {
  const pages = [
    page1Content,
    page2Content,
    page3Content,
    page4Content,
    page5Content,
    page6Content,
    page7Content,
    page8Content,
    page9Content
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