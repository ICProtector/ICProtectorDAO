import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Router from "./router";
import { defaultProviders } from "@connect2ic/core/providers";
import { createClient } from "@connect2ic/core";
import { Connect2ICProvider } from "@connect2ic/react";
import "@connect2ic/core/style.css";
const client = createClient({
  providers: defaultProviders,
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Connect2ICProvider client={client}>
      <Router />
    </Connect2ICProvider>
  </React.StrictMode>
);
