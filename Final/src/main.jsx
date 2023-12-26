import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NextUIProvider>
      <main className="light">
        <App />
      </main>
    </NextUIProvider>
  </BrowserRouter>
);
