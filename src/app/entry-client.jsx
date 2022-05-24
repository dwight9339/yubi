import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import App from "./App";

import { ProductsListPage } from "../components/productsList/ProductsListPage";
import { ProductPage } from "../components/productPage/ProductPage";
import { VariantPage } from "../components/variantViewEdit/VariantPage";

ReactDOM.render((
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/products" />} />
        <Route path="products" element={<ProductsListPage />} />
        <Route path="product">
          <Route path=":productId" element={<ProductPage />} />
        </Route>
        <Route path="variant">
          <Route path=":variantId" element={<VariantPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
), document.getElementById("app"));
