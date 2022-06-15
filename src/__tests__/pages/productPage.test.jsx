import { describe, test, expect, vi, beforeAll, afterAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Routes } from "../../app/Routes";
import { 
  PRODUCT,
  VARIANT,
  VARIANTS_BY_PRODUCT
} from "../productPageMocks";
import { mockProvidersWrap } from "../test-utils";

describe("Product Page", () => {
  beforeAll(() => {
    delete window.location;
    window.location = { 
      origin: "https://www.example.com",
      assign: vi.fn(),
      reload: vi.fn() 
    };
  });

  afterAll(() => {
    window.location = location;
  });

  test("Shows spinner when loading", async () => {
    const { mock, id } = PRODUCT.VALID_NO_VARIANTS; 
    const { result: { data: { product } } } = mock;

    render(
      <MemoryRouter
        initialEntries={[
          "/",
          `/product/${id}`
        ]}
      >
        <Routes />
      </MemoryRouter>
    , {
      wrapper: mockProvidersWrap([
        PRODUCT.VALID_NO_VARIANTS.mock,
        VARIANTS_BY_PRODUCT.NO_VARIANTS.mock(id)
      ])
    })

    await expect(screen.findByTestId("spinner")).resolves.toBeDefined();
  });

  describe("Product with no variants", async () => {
    test("Loads correct components and content", async () => {
      const { mock, id } = PRODUCT.VALID_NO_VARIANTS; 
      const { result: { data: { product } } } = mock;

      render(
        <MemoryRouter
          initialEntries={[
            "/",
            `/product/${id}`
          ]}
        >
          <Routes />
        </MemoryRouter>
      , {
        wrapper: mockProvidersWrap([
          PRODUCT.VALID_NO_VARIANTS.mock,
          VARIANTS_BY_PRODUCT.NO_VARIANTS.mock(id)
        ])
      })
      
      await new Promise(resolve => setTimeout(resolve, 0)); 
  
      // Shows product info
      await expect(screen.findByText(product.title)).resolves.toBeDefined();
      await expect(screen.findByAltText(product.featuredImage.altText)).resolves.toBeDefined();
      await expect(screen.findByText(product.description)).resolves.toBeDefined();

      // // Shows variants list (w/ no variants)
      await expect(screen.findByText("New variant")).resolves.toBeDefined();
      await expect(screen.findByText("No variants")).resolves.toBeDefined();
    });
  });

  describe("Product with some variants", async () => {
    test("Loads correct components and content", async () => {
      const { mock: productMock, id: productId } = PRODUCT.VALID_W_VARIANTS; 
      const { mock: variantsMock } = VARIANTS_BY_PRODUCT.PRODUCT_1_VARIANTS;
      const { result: { data: { product } } } = productMock;
      const { result: { data: { productVariants } } } = variantsMock(productId);

      render(
      <MemoryRouter
        initialEntries={[
          "/",
          `/product/${productId}`
        ]}
      >
        <Routes />
      </MemoryRouter>
      , {
        wrapper: mockProvidersWrap([
          productMock,
          variantsMock(productId)
        ])
      });
      
      await new Promise(resolve => setTimeout(resolve, 0)); 
  
      // Shows product info
      await expect(screen.findByText(product.title)).resolves.toBeDefined();
      await expect(screen.findByAltText(product.featuredImage.altText)).resolves.toBeDefined();
      await expect(screen.findByText(product.description)).resolves.toBeDefined();

      // // Shows variants list (w/ no variants)
      await expect(screen.findByText("New variant")).resolves.toBeDefined();
      productVariants.edges.forEach(async ({ node }) => {
        await expect(screen.findByText(node.title)).resolves.toBeDefined();
        await expect(screen.findByText(node.price)).resolves.toBeDefined();
      });
    });
  });

  describe("Page actions", async () => {
    test("Product card edit button opens product edit form", async () => {
      const { mock, id } = PRODUCT.VALID_NO_VARIANTS; 
      const { result: { data: { product } } } = mock;

      render(
        <MemoryRouter
          initialEntries={[
            "/",
            `/product/${id}`
          ]}
        >
          <Routes />
        </MemoryRouter>
      , {
        wrapper: mockProvidersWrap([
          PRODUCT.VALID_NO_VARIANTS.mock,
          VARIANTS_BY_PRODUCT.NO_VARIANTS.mock(id)
        ])
      })
      
      await new Promise(resolve => setTimeout(resolve, 0));

      // Product edit form text not shown on page load
      await expect(screen.findByText(`Update ${product.title}`)).rejects.toThrowError();

      const editButton = await screen.findByText("Edit");
      fireEvent.click(editButton);

      // Product edit form text shown after button click
      await expect(screen.findByText(`Update ${product.title}`)).resolves.toBeDefined();
    });

    test("New Variant button opens variant form", async () => {
      const { mock, id } = PRODUCT.VALID_NO_VARIANTS; 
      const { result: { data: { product } } } = mock;

      render(
        <MemoryRouter
          initialEntries={[
            "/",
            `/product/${id}`
          ]}
        >
          <Routes />
        </MemoryRouter>
      , {
        wrapper: mockProvidersWrap([
          PRODUCT.VALID_NO_VARIANTS.mock,
          VARIANTS_BY_PRODUCT.NO_VARIANTS.mock(id)
        ])
      })
      
      await new Promise(resolve => setTimeout(resolve, 0));

      // Variant form text not present on page load
      await expect(screen.findByText("Create Variant")).rejects.toThrowError();

      const newVariantButton = await screen.findByText("New variant");
      fireEvent.click(newVariantButton);

      // Variant form text shows after button click
      await expect(screen.findByText("Create Variant")).resolves.toBeDefined();
    });

    test("Product delete button opens confirm delete modal", async () => {
      const { mock, id } = PRODUCT.VALID_NO_VARIANTS; 
      const { result: { data: { product } } } = mock;

      render(
        <MemoryRouter
          initialEntries={[
            "/",
            `/product/${id}`
          ]}
        >
          <Routes />
        </MemoryRouter>
      , {
        wrapper: mockProvidersWrap([
          PRODUCT.VALID_NO_VARIANTS.mock,
          VARIANTS_BY_PRODUCT.NO_VARIANTS.mock(id)
        ])
      })
      
      await new Promise(resolve => setTimeout(resolve, 0));

      // Modal text not shown on page load
      await expect(screen.findByText("Confirm delete")).rejects.toThrowError();
      await expect(screen.findByText(`Are you sure you want to delete ${product.title}?`)).rejects.toThrowError();

      const deleteProductButton = await screen.findByText("Delete");
      fireEvent.click(deleteProductButton);

      // Modal text shows after button click
      await expect(screen.findByText("Confirm delete")).resolves.toBeDefined();
      await expect(screen.findByText(`Are you sure you want to delete ${product.title}?`)).resolves.toBeDefined();
    });

    // test("Delete performs as expected", async () => {
    //   const { mock, id } = PRODUCT.VALID_NO_VARIANTS; 
    //   const { result: { data: { product } } } = mock;
  
    //   const { container } = render(
    //     <MemoryRouter
    //       initialEntries={[
    //         "/",
    //         `/product/${id}`
    //       ]}
    //     >
    //       <Routes />
    //     </MemoryRouter>
    //   , {
    //     wrapper: mockProvidersWrap([
    //       PRODUCT.VALID_NO_VARIANTS.mock,
    //       VARIANTS_BY_PRODUCT.NO_VARIANTS.mock(id),
    //       PRODUCTS.NO_PRODUCTS.mock
    //     ])
    //   })
      
    //   await new Promise(resolve => setTimeout(resolve, 0));
  
    //   const deleteProductButton = await screen.findByText("Delete");
    //   fireEvent.click(deleteProductButton);
  
    //   const deleteButton = container.querySelector(
    //     '#PolarisPortalsContainer > div:nth-child(1) > div:nth-child(1) > div > div > div > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div:nth-child(2)'
    //   );

    //   // screen.logTestingPlaygroundURL(deleteButton);
    //   fireEvent.click(deleteButton);

    //   await new Promise(resolve => setTimeout(resolve, 1000));
      
    //   // Confirm reroutes to /products
    //   await expect(screen.findByText("Unique Variants Products")).resolves.toBeDefined();
    //   await expect(screen.findByText("No Unique Variants products yet")).resolves.toBeDefined();
    // });

    test("Clicking variant list item correct variant page", async () => {
      const { mock: productMock, id: productId } = PRODUCT.VALID_W_VARIANTS; 
      const { mock: variantsMock } = VARIANTS_BY_PRODUCT.PRODUCT_1_VARIANTS;
      const { mock: variantMock } = VARIANT.PRODUCT_1_FIRST_IN_LIST;
      const { result: { data: { product } } } = productMock;
      const { result: { data: { productVariants } } } = variantsMock(productId);
      const { result: { data: { productVariant } } } = variantMock(productId);

      render(
      <MemoryRouter
        initialEntries={[
          "/",
          `/product/${productId}`
        ]}
      >
        <Routes />
      </MemoryRouter>
      , {
        wrapper: mockProvidersWrap([
          productMock,
          variantsMock(productId),
          variantMock(productId)
        ])
      });
      
      await new Promise(resolve => setTimeout(resolve, 0)); 
  
      const { title, price, image } = productVariants.edges[0].node;
      const firstListItem = await screen.findByText(title);

      fireEvent.click(firstListItem);

      await new Promise(resolve => setTimeout(resolve, 0)); 

      const { description } = productVariant;

      // Check that variant page loads
      await expect(screen.findByText("Price")).resolves.toBeDefined();
      await expect(screen.findByText(title)).resolves.toBeDefined();
      await expect(screen.findByText("Description")).resolves.toBeDefined();
      await expect(screen.findByText(description.value)).resolves.toBeDefined();
      await expect(screen.findByAltText(image.altText)).resolves.toBeDefined();
    });
  });
});