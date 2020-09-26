import React, { Component } from "react";
import { connect } from "react-redux";
import MapComponent from "./MapComponent";
import { InfoPopover } from "./InfoPopover";
import MapSelect from "components/MapSelect";
import MarkerModal from "components/Modal";
import Sider from "components/Menu";
import { Context, ServicesContext } from "ServiceInit";
import { ElevationChartHOC } from "components/ElevationChartHOC";

interface Props {
  loadingTrack: Boolean;
  loadingMarkers: Boolean;
  shouldShowModal: Boolean;
}

class MapParentComponent extends Component<Props, {}> {
  public context: Context;
  static contextType = ServicesContext;

  componentDidMount() {
    this.context.mapInitialiser.init();
  }

  componentWillUnmount() {
    this.context.mapInitialiser.destroy();
  }

  render() {
    const { loadingTrack, loadingMarkers, shouldShowModal } = this.props;

    if (loadingTrack || loadingMarkers) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="map">
          <MapSelect parentNode={"map"} />
          <MapComponent />
          {shouldShowModal ? <MarkerModal /> : null}
          <Sider />
          <ElevationChartHOC />
          <InfoPopover />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  loadingTrack: state.loadingTrack,
  loadingMarkers: state.loadingMarkers,
  shouldShowModal: state.shouldShowModal,
});

export const MapHOC = connect(mapStateToProps)(MapParentComponent);