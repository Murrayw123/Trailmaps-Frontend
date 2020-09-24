import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { RouteSwitcher } from "components/RouteSwitcher";
import { ServicesContext } from "ServiceInit";
import { services } from "index";

export class Router extends Component {
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
