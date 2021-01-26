import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Router from "./components/Router";
import "../node_modules/antd/dist/antd.css";
import "./css/App.css";
import "./css/Menu.css";
import "./css/MapComponent.css";
import "./css/Chart.css";
import "./css/LandingPage.css";
import "./css/MapSwitcher.css";
import "./css/context-menu.css";
import "./css/marker-modal.css";
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
