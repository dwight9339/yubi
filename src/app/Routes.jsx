import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom"
import { App } from "./App";
import { ProductsListPage } from "../components/pages/productsList/ProductsListPage";
import { ProductsList } from "../components/pages/productsList/ProductsList";
import { ProductPage } from "../components/pages/productPage/ProductPage";
import { ProductView } from "../components/pages/productPage/ProductView";
import { ProductForm } from "../components/forms/ProductForm";
import { VariantPage } from "../components/pages/variantPage/VariantPage";
import { VariantForm } from "../components/forms/VariantForm";
import { VariantView } from "../components/pages/variantPage/VariantView";

export const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/products" />} />
        <Route path="products" element={<ProductsListPage />}>
          <Route index element={<ProductsList />} />
          <Route path="new-product" element={<ProductForm />} />
        </Route>
        <Route path="product">
          <Route path=":productId" element={<ProductPage />}>
            <Route index element={<ProductView />} />
            <Route path="new-variant" element={<VariantForm />} />
            <Route path="edit" element={<ProductForm />} /> 
          </Route>
        </Route>
        <Route path="variant">
          <Route path=":variantId" element={<VariantPage />}>
            <Route index element={<VariantView />} />
            <Route path="edit" element={<VariantForm />} />
          </Route>
        </Route>
      </Route>
    </ReactRoutes>
  );
}