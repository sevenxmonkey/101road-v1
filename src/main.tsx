import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { DataStoreProvider } from "./context/DataStoreContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DataStoreProvider>
      <App />
    </DataStoreProvider>
  </React.StrictMode>
);