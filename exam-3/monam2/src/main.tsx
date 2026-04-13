import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import {
  CartPage,
  CatalogPage,
  NotFoundPage,
  CatalogDetailPage,
  OrderCompletePage,
} from "@/pages";
import { AppProviders } from "@/providers";
import { DevToolPanel } from "@/DevToolPanel";

import { Layout } from "@/shared/layout";
import { initializeMockStorage } from "@/mocks/storage";

import "@/styles/reset.css";
import { AsyncBoundary } from "@/shared/components";

async function enableMocking() {
  const { worker } = await import("@/mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

initializeMockStorage();

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <AppProviders>
          <DevToolPanel />
          <Layout>
            <AsyncBoundary>
              <Routes>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/menu/:itemId" element={<CatalogDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/orders/:orderId"
                  element={<OrderCompletePage />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AsyncBoundary>
          </Layout>
        </AppProviders>
      </BrowserRouter>
    </React.StrictMode>,
  );
});
