import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { PasswordProvider } from "./Context/PasswordContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NextUIProvider>
      <AuthContextProvider>
        <PasswordProvider>
          <main className="light">
          <App />
          </main>
        </PasswordProvider>
      </AuthContextProvider>
    </NextUIProvider>
  </BrowserRouter>
);
