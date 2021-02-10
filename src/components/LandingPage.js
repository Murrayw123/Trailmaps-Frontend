import React, { Component } from "react";
import MapSelect from "./MapSelect";
import { connect } from "react-redux";
import {fetchOtherMaps} from "../redux/requests";

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

          <div className="disclaimer">
            <p className="title">
              Interactive Bushwalking and Bikepacking maps. View distance,
              elevation, towns and campsites + more!
            </p>
            <p>
              <b> Disclaimer:</b> Trailmaps is not intended for navigation
              purposes and should be used for route planning only. Trailmaps
              relies on third party track files which may contain errors. No
              responsibility is accepted for personal injury or property damage
              from your reliance on any of the information contained on this
              site.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(LandingPage);
