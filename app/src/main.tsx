import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Coaches from "./components/views/Coaches.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/coaches" element={<Coaches />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
