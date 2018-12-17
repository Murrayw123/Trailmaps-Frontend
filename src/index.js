import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import dataReducer from "./redux/reducers";
import thunk from "redux-thunk";
import Router from "./components/Router";
import unregister from "./_registerServiceWorker";
import "../node_modules/antd/dist/antd.css";
import "./css/App.css";
import "./css/Menu.css";
import "./css/MapComponent.css";
import "./css/Chart.css";
import "./css/LandingPage.css";

const store = createStore(dataReducer, applyMiddleware(thunk));
unregister();
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
