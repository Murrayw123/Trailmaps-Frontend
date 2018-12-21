import React, { Component } from "react";
import MapSelect from "./MapSelect";
import { fetchOtherMaps } from "../redux/actions";
import connect from "react-redux/es/connect/connect";

export class LandingPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchOtherMaps());
  }

  render() {
    return (
      <div className="landing-page">
        <div className="map-switcher-block">
          <h1> Trail Maps </h1>
          <div className="map-switcher-div">
            <MapSelect
              placeholder={"Select a Map"}
              parentNode={"map-switcher-block"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(LandingPage);
