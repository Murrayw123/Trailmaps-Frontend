import React, {Component} from "react";
import {HashRouter} from "react-router-dom";
import {RouteSwitcher} from "./RouteSwitcher";

export default class Router extends Component {
  render() {
    return (
      <HashRouter>
        <RouteSwitcher />
      </HashRouter>
    );
  }
}
