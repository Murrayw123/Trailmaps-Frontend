import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { RouteSwitcher } from "routing/RouteSwitcher";
import { ServicesContext } from "helpers/ServiceInit";
import { services } from "StoreAndServicesSetup";

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
