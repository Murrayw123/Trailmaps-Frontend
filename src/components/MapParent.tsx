import React, { Component } from "react";
import { connect } from "react-redux";
import MapComponent from "components/MapHOC";
import { InfoPopover } from "./InfoPopover";
import MapSelect from "components/MapSelect";
import MarkerModal from "components/modal/Modal";
import Sider from "components/Menu";
import { Context, ServicesContext } from "helpers/ServiceInit";
import { ElevationChartHOC } from "components/ElevationChartsHOC";
import { MapTerrainButton } from "components/TerrainButton";

interface Props {
  loadingTrack: boolean;
  loadingMarkers: boolean;
  shouldShowModal: boolean;
}

const checkForIFrame = () => {
  if (!process.env["REACT_APP_ALLOW_DISABLE_IFRAME"]) {
    return;
  }
  const iFramed = window.self !== window.top;
  if (!iFramed && window.location.pathname.substring(6) === "mundabiddi") {
    window.location.href =
      "https://www.mundabiddi.org.au/pages/biddi-clubhouse";
  }
};

class MapParentComponent extends Component<Props, Record<string, never>> {
  public context: Context;
  static contextType = ServicesContext;

  async componentDidMount() {
    await this.context.mapInitialiser.init(
      window.location.pathname.substring(6)
    );
  }

  setPitch(setPitched: boolean): void {
    if (setPitched) {
      this.context.mapBoxMapService.setPitch(60);
    } else {
      this.context.mapBoxMapService.setPitch(0);
    }
  }

  componentWillUnmount() {
    this.context.mapInitialiser.destroy();
  }

  render() {
    const { loadingTrack, loadingMarkers, shouldShowModal } = this.props;
    // checkForIFrame();

    if (loadingTrack || loadingMarkers) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="map">
          <MapSelect parentNode={"map"} />
          <MapTerrainButton setPitched={(pitched) => this.setPitch(pitched)} />
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
