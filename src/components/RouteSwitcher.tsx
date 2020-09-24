import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { NotFound } from "./404";
import LandingPage from "./LandingPage";
import { MapHOC } from "components/MapHOC";

export class RouteSwitcher extends Component {
  onMapSelect = () => {
    window.location.href = "/maps/mundabiddi";
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/mundabiddi" component={this.onMapSelect} />
        <Route path="/maps/" component={MapHOC} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
