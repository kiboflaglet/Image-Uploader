import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import ImageUploader from "./ImageUploader.tsx";
import ImagePreview from "./ImagePreview.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<ImageUploader />} />
            <Route path="/:id" element={<ImagePreview />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
