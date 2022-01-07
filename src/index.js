import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/GlobalContext";
import { FireBaseProvider } from "./context/fireBaseContext";
ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>
      <FireBaseProvider>
        <App />
      </FireBaseProvider>
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
