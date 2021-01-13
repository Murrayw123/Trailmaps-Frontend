import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import MapParent from "./MapParent";
import { NotFound } from "./404";
import LandingPage from "./LandingPage";

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