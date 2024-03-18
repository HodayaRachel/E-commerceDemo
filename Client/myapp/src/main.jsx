import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore } from "redux";
import { Provider } from "react-redux";
import  appReducer from "./appReducer.jsx";
import { loadState } from "./Utils/localStoregeUtils.jsx";

const persistedState = loadState();
const appStore = legacy_createStore(appReducer, persistedState);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={appStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
