import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./ConText/AppContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import "./index.css";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
          ,
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
