import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ItemsProvider } from "./context/ItemsContext.jsx";
import "../src/styles/index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ItemsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ItemsProvider>
    </BrowserRouter>
  </StrictMode>
);
