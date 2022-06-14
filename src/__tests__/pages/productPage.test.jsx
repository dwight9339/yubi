import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Routes } from "../../app/Routes";
import { 
  PRODUCTS,
  VARIANTS_BY_PRODUCT
} from "../mockData";
import { mockProvidersWrap } from "../test-utils";

describe("Product Page", async () => {
  beforeAll(() => {
    delete window.location;
    window.location = { 
      origin: "https://www.example.com",
      assign: vi.fn(),
      reload: vi.fn() 
    };
  });

  test("Shows spinner when loading", async () => {
    const { mock, id } = PRODUCTS.VALID_NO_VARIANTS; 
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
        PRODUCTS.VALID_NO_VARIANTS.mock,
        VARIANTS_BY_PRODUCT.NO_VARIANTS.mock(id)
      ])
    })

    await expect(screen.findByTestId("spinner")).resolves.toBeDefined();
  });

  describe("Product with no variants", async () => {
    test("Loads correct components and content", async () => {
      const { mock, id } = PRODUCTS.VALID_NO_VARIANTS; 
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
          PRODUCTS.VALID_NO_VARIANTS.mock,
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
      const { mock: productMock, id: productId } = PRODUCTS.VALID_W_VARIANTS; 
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
      const { mock, id } = PRODUCTS.VALID_NO_VARIANTS; 
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
          PRODUCTS.VALID_NO_VARIANTS.mock,
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
      const { mock, id } = PRODUCTS.VALID_NO_VARIANTS; 
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
          PRODUCTS.VALID_NO_VARIANTS.mock,
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
      const { mock, id } = PRODUCTS.VALID_NO_VARIANTS; 
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
          PRODUCTS.VALID_NO_VARIANTS.mock,
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
  });
});