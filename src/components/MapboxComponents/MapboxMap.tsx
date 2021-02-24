import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "components/MapboxComponents/MapboxMap.css";
import { OnClickCallback } from "Interfaces/Types";
import { Context, ServicesContext } from "helpers/ServiceInit";
import { GlobalState } from "Interfaces/GlobalState";
import { connect } from "react-redux";

// TODO - hacky workaround for the Babel Issue
// eslint-disable-next-line @typescript-eslint/no-var-requires
(mapboxgl as any).workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken =
  "pk.eyJ1IjoibXVycmF5dzEyMyIsImEiOiJja2tkZm94OXYwOXRyMndtaXo1bjdlN3YzIn0.JSOACtJHoSLIL3yswen8-A";

interface Props {
  onClick: OnClickCallback;
  onContextMenu: OnClickCallback;
  zoom: GlobalState["zoom"];
  center: GlobalState["center"];
}

class Map extends Component<Props, never> {
  private _mapContainer: HTMLElement;

  public context: Context;
  static contextType = ServicesContext;

  componentDidMount(): void {
    const { mapBoxMapService, servicesReady } = this.context;
    mapBoxMapService.init(this._mapContainer);

    servicesReady(() => {
      mapBoxMapService.setOnClick((e: mapboxgl.MapMouseEvent) => {
        e["latlng"] = e.lngLat; // meet existing interface
        this.props.onClick(e);
      });

      mapBoxMapService.setOnContextMenu((e: mapboxgl.MapMouseEvent) => {
        e["latlng"] = e.lngLat; // meet existing interface
        this.props.onContextMenu(e);
      });
    });
  }

  render(): JSX.Element {
    this.context.mapBoxMapService.updateMap();
    return (
      <>
        <div ref={(el) => (this._mapContainer = el)} className="mapContainer" />
      </>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  center: state.center,
  zoom: state.zoom,
});

export const MapboxMap = connect(mapStateToProps)(Map);
