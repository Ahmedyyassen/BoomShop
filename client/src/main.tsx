import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AnimatePresence mode="wait">
        <Provider store={store}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#e9e9e9",
                  borderRadius: "5px",
                  padding: "14px",
                },
              }}
            />
            <App />
          </ThemeProvider>
        </Provider>
      </AnimatePresence>
    </QueryClientProvider>
  </StrictMode>
);
