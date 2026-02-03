import { Route, Routes } from "react-router";
import App from "../App";
import Products from "../pages/Products";
import ProductDetail from "../pages/Detail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Wrapper from "../components/ui/Wrapper";

const Routers = () => {
  return (
    <Wrapper>
      <Routes>
        <Route index element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Wrapper>
  );
};

export default Routers;
