import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ProductProvider } from "./utils/ProductContext"; // <-- Import ProductProvider di sini

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 1. QueryClientProvider PALING LUAR */}
      <QueryClientProvider client={queryClient}>
        {/* 2. ProductProvider di DALAM QueryClientProvider */}
        <ProductProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </ProductProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);