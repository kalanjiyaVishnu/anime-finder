import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/GlobalContext";
import { FireBaseProvider } from "./context/fireBaseContext";
import UserProvider from "./context/userContext";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <ContextProvider>
        <FireBaseProvider>
          <App />
        </FireBaseProvider>
      </ContextProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
