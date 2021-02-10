import React, { Component } from "react";
import { connect } from "react-redux";
import MapComponent from "./MapComponent";
import { InfoPopover } from "./InfoPopover";
import MapSelect from "components/MapSelect";
import MarkerModal from "components/Modal";
import Sider from "components/Menu";
import { Context, ServicesContext } from "helpers/ServiceInit";
import { ElevationChartHOC } from "components/ElevationChartsHOC";

interface Props {
  loadingTrack: boolean;
  loadingMarkers: boolean;
  shouldShowModal: boolean;
}

class MapParentComponent extends Component<Props, Record<string, never>> {
  public context: Context;
  static contextType = ServicesContext;

  async componentDidMount() {
    await this.context.mapInitialiser.init(window.location.pathname.substring(6));
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
