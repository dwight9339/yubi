import { describe, test, expect, vi, beforeAll, afterAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Routes } from "../../app/Routes";
import { 
  PRODUCT,
  PRODUCTS,
  VARIANTS_BY_PRODUCT
} from "../mocks/productsListMocks";
import { mockProvidersWrap } from "../test-utils";
import { QUERY_PAGE_SIZE } from "../../constants";

describe("Products List Page", () => {
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

  test("Shows spinner while loading products list", () => {
    const { mock } = PRODUCTS.NO_PRODUCTS;

    render(
      <MemoryRouter
        initialEntries={["/"]}
      >
        <Routes />
      </MemoryRouter>
    , {wrapper: mockProvidersWrap([mock])});

    expect(screen.queryByTestId("Spinner")).toBeDefined();
  });

  test("Loads correctly with no products", async () => {
    const { mock } = PRODUCTS.NO_PRODUCTS;

    render(
      <MemoryRouter
        initialEntries={["/"]}
      >
        <Routes />
      </MemoryRouter>
    , {wrapper: mockProvidersWrap([mock])});

    await new Promise(resolve => setTimeout(resolve, 0)); 

    await expect(screen.findByText("No Unique Variants products yet")).resolves.toBeDefined();
    await expect(screen.findByText("Search Products")).resolves.toBeDefined();
    await expect(screen.findByText("Create New")).resolves.toBeDefined();
    await expect(screen.findByText("Refresh")).resolves.toBeDefined();
  });

  test ("Loads correctly with products", async () => {
    const { mock: productsMock } = PRODUCTS.SOME_PRODUCTS;
    const { result: { data: { products } } } = productsMock;

    render(
      <MemoryRouter
        initialEntries={["/"]}
      >
        <Routes />
      </MemoryRouter>
    , {wrapper: mockProvidersWrap([productsMock])});

    await new Promise(resolve => setTimeout(resolve, 0)); 

    // Check that page actions are visible 
    await expect(screen.findByText("Search Products")).resolves.toBeDefined();
    await expect(screen.findByText("Create New")).resolves.toBeDefined();
    await expect(screen.findByText("Refresh")).resolves.toBeDefined();

    screen.logTestingPlaygroundURL();

    // Check that all products loaded
    products.edges.forEach(({ node: product }) => {
      expect(screen.queryByText(product.title)).toBeDefined();
      expect(screen.queryByAltText(product.featuredImage.altText)).toBeDefined();
      expect(screen.queryByTestId(`variants-preview-toggle-${product.id}`)).toBeDefined();

      product.variants.edges.forEach(({ node: variant}) => {
        expect(screen.queryByText(variant.title)).toBeDefined();
        expect(screen.queryByAltText(variant.image.altText)).toBeDefined();
      });
    });
  });

  test ("Clicking product list item loads product page", async () => {
    const { mock: productsMock } = PRODUCTS.SOME_PRODUCTS;
    const { mock: productMock } = PRODUCT.PRODUCT_1;
    const { mock: variantsMock } = VARIANTS_BY_PRODUCT.PRODUCT_1_VARIANTS;
    const { result: { data: { products } } } = productsMock;
    const { result: { data: { product } } } = productMock;

    render(
      <MemoryRouter
        initialEntries={["/"]}
      >
        <Routes />
      </MemoryRouter>
    , {wrapper: mockProvidersWrap([
      productsMock,
      productMock,
      variantsMock
    ])});

    await new Promise(resolve => setTimeout(resolve, 10)); 

    const productListItem = screen.queryByText(product.title);
    expect(productListItem).toBeDefined();

    fireEvent.click(screen.getByText(product.title));

    await new Promise(resolve => setTimeout(resolve, 0)); 

    // Check product page loaded
    expect(screen.queryByText("Product Info")).toBeDefined();

    // Check correct product loaded
    expect(screen.queryByText(product.title)).toBeDefined();
  });
});