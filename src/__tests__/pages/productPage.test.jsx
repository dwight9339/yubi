import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
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

    expect(screen.findByRole("spinner")).resolves.toBeDefined();
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
      // await expect(screen.findByTestId("")).resolves.toBeDefined();
    });
  });
});