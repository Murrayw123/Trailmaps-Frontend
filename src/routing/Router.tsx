import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { RouteSwitcher } from "routing/RouteSwitcher";
import { services } from "index";
import { ServicesContext } from "helpers/ServiceInit";

export default class Router extends Component {
  render() {
    return (
      <ServicesContext.Provider value={services.getServices()}>
        <BrowserRouter>
          <RouteSwitcher />
        </BrowserRouter>
      </ServicesContext.Provider>
    );
  }
}
