import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ItemsProvider } from "./context/ItemsContext.jsx";
import "../src/styles/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ItemsProvider>
      <App />
      </ItemsProvider>
    </BrowserRouter>
      </StrictMode>
);
