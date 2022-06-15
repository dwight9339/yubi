import { describe, test, expect, vi, beforeAll, afterAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { mockProvidersWrap } from "../test-utils";
import { Routes } from "../../app/Routes";  
import { VARIANT } from "../mocks/variantPageMocks";

describe("Variant Page", () => {
  test("Shows spinner when loading", () => {
    const { mock } = VARIANT.TEST_VARIANT;

    render(
      <MemoryRouter
        initialEntries={[
          "/",
          "/product/7738299613435",
          "/variant/43160656052475"
        ]}
      >
        <Routes />
      </MemoryRouter>
    , {wrapper: mockProvidersWrap([mock])});

    expect(screen.getByTestId("spinner")).toBeDefined();
  });

  test("Loads and displays variant data", async () => {
    const { mock } = VARIANT.TEST_VARIANT;
    const { result: { data: { productVariant: variant } } } = mock;

    render(
      <MemoryRouter
        initialEntries={[
          "/",
          "/product/7738299613435",
          "/variant/43160656052475"
        ]}
      >
        <Routes />
      </MemoryRouter>
    , {wrapper: mockProvidersWrap([mock])});

    await new Promise(resolve => setTimeout(resolve, 0)); 
    
    await expect(screen.findByText(variant.title)).resolves.toBeDefined();
    await expect(screen.findByText("Price")).resolves.toBeDefined();
    await expect(screen.findByText(variant.price, {exact: false})).resolves.toBeDefined();
    await expect(screen.findByText("Description")).resolves.toBeDefined();
    await expect(screen.findByText(variant.description.value)).resolves.toBeDefined();
    await expect(screen.findByText("Edit")).resolves.toBeDefined();
    await expect(screen.findByText("Delete")).resolves.toBeDefined();
  });

  test("Displays unfound message if given bad id", async () => {
    const { mock } = VARIANT.INVALID_VARIANT_ID;

    render(
      <MemoryRouter
        initialEntries={[
          "/",
          "/product/7738299613435",
          "/variant/222222"
        ]}
      >
        <Routes />
      </MemoryRouter>
    , {wrapper: mockProvidersWrap([mock])});

    await new Promise(resolve => setTimeout(resolve, 0)); 
    
    await expect(screen.findByText(
      "Sorry, we couldn't find a variant with ID 222222. Are you sure it exists?"
    )).resolves.toBeDefined();
  });

  test("Clicking edit button opens variant form in edit mode", async () => {
    const { mock } = VARIANT.TEST_VARIANT;
    const { result: { data: { productVariant: variant } } } = mock;

    render(
      <MemoryRouter
        initialEntries={[
          "/",
          "/product/7738299613435",
          "/variant/43160656052475"
        ]}
      >
        <Routes />
      </MemoryRouter>
    , {wrapper: mockProvidersWrap([mock])});

    await new Promise(resolve => setTimeout(resolve, 0)); 
    
    await expect(screen.findByText(`Edit ${variant.title}`)).rejects.toThrowError();

    const editVariantButton = await screen.findByText("Edit");
    fireEvent.click(editVariantButton);

    await expect(screen.findByText(`Edit ${variant.title}`)).resolves.toBeDefined();
    await expect(screen.findByLabelText("Name")).resolves.toBeDefined();
    await expect(screen.findByLabelText("Description")).resolves.toBeDefined();
    await expect(screen.findByLabelText("Price")).resolves.toBeDefined();
    await expect(screen.findByLabelText("Image")).resolves.toBeDefined();
  });
});