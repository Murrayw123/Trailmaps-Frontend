import React, {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import {RouteSwitcher} from "./RouteSwitcher";

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <RouteSwitcher />
      </BrowserRouter>
    );
  }
}
