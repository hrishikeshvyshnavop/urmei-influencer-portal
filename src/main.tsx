import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App";
import { installLinkInterception, upgradeLegacyHashRoute } from "./router";

// Before the first render, so an old `/#/route` link lands on its screen.
upgradeLegacyHashRoute();
installLinkInterception();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
