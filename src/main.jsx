import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "/workspaces/StarWarsBlogErikRuiz/src/index.css"

const root = createRoot(document.getElementById("app"));

root.render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
);
