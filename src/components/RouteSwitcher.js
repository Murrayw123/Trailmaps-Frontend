import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import MapParent from "./MapParent";
import LandingPage from "./LandingPage";

export class RouteSwitcher extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route component={MapParent} />
      </Switch>
    );
  }
}
