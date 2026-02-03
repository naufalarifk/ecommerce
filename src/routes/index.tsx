import { Route, Routes } from "react-router";
import App from "../App";
import Products from "../pages/Products";
import Wrapper from "../components/ui/Wrapper";

const Routers = () => {
  return (
    <Wrapper>
      <Routes>
        <Route index element={<App />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Wrapper>
  );
};

export default Routers;
