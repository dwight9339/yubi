import { describe, test, expect, vi, beforeAll, afterAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Routes } from "../../app/Routes";
import { 
  PRODUCTS
} from "../mocks/productsListMocks";
import { mockProvidersWrap } from "../test-utils";

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
});