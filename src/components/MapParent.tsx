import React, { Component, useContext } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import MapComponent from "./MapComponent";
import ElevationChart from "./ElevationChart";
import {
  fetchData,
  fetchMarkers,
  fetchOtherMaps,
  fetchTrailUsers,
} from "redux/actions";
import { Rnd as ElevationChartWrapper } from "react-rnd";
import { Button, Icon } from "antd";
import { InfoPopover } from "./InfoPopover";
import MapSelect from "components/MapSelect";
import MarkerModal from "components/Modal";
import Sider from "components/Menu";
import { ServicesContext, Context } from "ServiceInit";

export class MapParent extends Component {
  public context: Context;
  static contextType = ServicesContext;

  state = { width: "40%", height: 125, showElevation: true };

  componentDidMount() {
    this.context.mapInitialiser.init();
  }

  componentWillUnmount() {
    this.context.mapInitialiser.destroy();
  }

  elevationChartStatus = (state) => {
    this.setState({ showElevation: state });
  };

  render() {
    const {
      loadingTrack,
      loadingMarkers,
      customPath,
      shouldShowModal,
    } = this.props;
    const { showElevation } = this.state;
    if (loadingTrack || loadingMarkers) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="map">
          <MapSelect parentNode={"map"} />
          <MapComponent />
          {shouldShowModal ? <MarkerModal /> : null}
          <Sider />
          {!_.isEmpty(customPath) &&
          showElevation &&
          customPath.distance > 0 ? (
            <ElevationChartWrapper
              className="elevation-chart"
              size={{ width: this.state.width, height: this.state.height }}
              onResize={(e, direction, ref, delta, position) => {
                this.setState({
                  width: ref.style.width,
                  height: ref.style.height,
                  ...position,
                });
              }}
            >
              <ElevationChart />
              <Icon
                className="minimise-chart"
                type="down-circle"
                onClick={() => {
                  this.elevationChartStatus(false);
                }}
              />
            </ElevationChartWrapper>
          ) : !_.isEmpty(customPath) && customPath.distance > 0 ? (
            <Button
              className="show-elevation"
              type="primary"
              size="small"
              onClick={() => {
                this.elevationChartStatus(true);
              }}
            >
              <span>
                Show Elevation
                <Icon className="minimise-chart" type="up-circle" />
              </span>
            </Button>
          ) : null}
          <InfoPopover />
        </div>
      );
    }
  }
}
