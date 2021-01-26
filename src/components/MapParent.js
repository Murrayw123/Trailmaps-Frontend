import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import MapComponent from "./MapComponent";
import MarkerModal from "./Modal";
import ElevationChart from "./ElevationChart";
import MapSelect from "./MapSelect";
import {
  fetchData,
  fetchMarkers,
  fetchOtherMaps,
  fetchTrailUsers,
} from "../redux/actions";
import { Rnd as ElevationChartWrapper } from "react-rnd";
import { Button } from "antd";
import Sider from "./Menu.js";
import { InfoPopover } from "./InfoPopover";
import Icon from "@ant-design/icons";

class MapParent extends Component {
  state = { width: "40%", height: 125, showElevation: true };

  componentDidMount() {
    let currentMap = window.location.pathname.substring(6);
    this.props.dispatch(fetchData(currentMap));
    this.props.dispatch(fetchMarkers(currentMap));
    this.props.dispatch(fetchOtherMaps());
    this.props.dispatch(fetchTrailUsers(currentMap));
    this.interval = setInterval(
      () => this.props.dispatch(fetchTrailUsers(currentMap)),
      20000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
          showElevation === true &&
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

const mapStateToProps = (state) => ({
  data: state.data,
  loadingTrack: state.loadingTrack,
  loadingMarkers: state.loadingMarkers,
  filters: state.filters,
  poiMarkers: state.poiMarkers,
  customPath: state.customPath,
  elevationChartData: state.elevationChartData,
  shouldShowModal: state.shouldShowModal,
});

export default connect(mapStateToProps)(MapParent);
