import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "../node_modules/antd/dist/antd.css";
import "leaflet/dist/leaflet.css";
import "./css/App.css";
import "./css/Menu.css";
import "./css/MapComponent.css";
import "./css/Chart.css";
import "./css/LandingPage.css";
import "./css/MapSwitcher.css";
import "./css/context-menu.css";
import "./css/marker-modal.css";
import Router from "routing/Router";
import { dataStore } from "StoreAndServicesSetup";

ReactDOM.render(
  <Provider store={dataStore}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
