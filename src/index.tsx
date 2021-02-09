import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import dataReducer from "./redux/reducers";
import thunk from "redux-thunk";
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
import { Services } from "helpers/ServiceInit";

export const dataStore = createStore(dataReducer as any, applyMiddleware(thunk));
export const services = new Services(dataStore);

ReactDOM.render(
  <Provider store={dataStore}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
