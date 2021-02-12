import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { NotFound } from "components/404";
import LandingPage from "components/LandingPage";
import { MapHOC } from "components/MapParent";

export class RouteSwitcher extends Component {
  onMapSelect = () => {
    window.location.href = "/maps/mundabiddi";
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" render={(props) => <LandingPage {...props} />} />
        <Route exact path="/mundabiddi" component={this.onMapSelect} />
        <Route path="/maps/" render={(props) => <MapHOC {...props} />} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
