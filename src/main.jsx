import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import App from "./App";
import Store from "./context/store";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import HouseContextProvider from "./components/HouseProjectsComponent/Filter/HouseContext";
import 'tailwindcss/tailwind.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <HouseContextProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </HouseContextProvider>
    </Provider>
  </React.StrictMode>
);
