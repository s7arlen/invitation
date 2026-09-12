import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Update document title and meta
document.title = "Anna & Rohan — Wedding Invitation";

const metaDesc = document.querySelector('meta[name="description"]');
if (metaDesc) {
  metaDesc.setAttribute("content", "You are invited to celebrate the wedding of Anna & Rohan on July 23, 2026.");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
