import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import MapComponent from "./MapComponent";
import ElevationChart from "./ElevationChart";
import MapSelect from "./MapSelect";
import {fetchData, fetchMarkers, fetchOtherMaps} from "../redux/actions";
import {Rnd as ElevationChartWrapper} from "react-rnd";
import {Button, Icon} from "antd";
import Sider from "./Menu.js";

class MapParent extends Component {
  state = { width: "40%", height: 125, showElevation: true };
  componentDidMount() {
    let currentMap = window.location.pathname.substring(1);
    this.props.dispatch(fetchData(currentMap));
    this.props.dispatch(fetchMarkers(currentMap));
    this.props.dispatch(fetchOtherMaps());
  }

  elevationChartStatus = state => {
    this.setState({ showElevation: state });
  };

  render() {
    const { loadingTrack, loadingMarkers } = this.props;
    const { showElevation } = this.state;

    if (loadingTrack || loadingMarkers) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="map">
          <MapSelect />
          <MapComponent />
          <Sider />
          {!_.isEmpty(this.props.customPath) && showElevation === true ? (
            <ElevationChartWrapper
              className="elevation-chart"
              size={{ width: this.state.width, height: this.state.height }}
              onResize={(e, direction, ref, delta, position) => {
                this.setState({
                  width: ref.style.width,
                  height: ref.style.height,
                  ...position
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
          ) : !_.isEmpty(this.props.customPath) ? (
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
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  data: state.data,
  loadingTrack: state.loadingTrack,
  loadingMarkers: state.loadingMarkers,
  filters: state.filters,
  poiMarkers: state.poiMarkers,
  customPath: state.customPath,
  elevationChartData: state.elevationChartData
});

export default connect(mapStateToProps)(MapParent);
