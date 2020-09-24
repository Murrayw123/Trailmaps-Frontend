import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { NotFound } from "./404";
import LandingPage from "./LandingPage";
import { MapParent } from "components/MapParent";

export class RouteSwitcher extends Component {
  onMapSelect = () => {
    window.location.href = "/maps/mundabiddi";
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/mundabiddi" component={this.onMapSelect} />
        <Route path="/maps/" component={MapParent} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
