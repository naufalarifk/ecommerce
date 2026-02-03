import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import Routers from "./routes/index.tsx";
import { CartProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CartProvider>
      <Routers />
    </CartProvider>
  </BrowserRouter>,
);
