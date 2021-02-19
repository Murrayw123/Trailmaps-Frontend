import React, { Component } from "react";
import { Context, ServicesContext } from "helpers/ServiceInit";
import { MapboxMarkerProps, Marker } from "Interfaces/Marker";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import { Popup } from "components/Popup";

interface Props extends MapboxMarkerProps {
  marker: Marker;
}

export class MapboxMarker extends Component<Props, never> {
  public context: Context;
  static contextType = ServicesContext;

  componentDidMount(): void {
    const { marker } = this.props;
    this.context.servicesReady(() => {
      const newMapBoxMarker = this.context.mapboxMarkerAdd.setMarker(
        this.props
      );

      const info = marker.marker_info;
      const title = marker.marker_title;
      const placeholder = document.createElement("div");

      ReactDOM.render(
        <Popup title={title} info={info} onClick={null} />,
        placeholder
      );

      const popup = new mapboxgl.Popup().setDOMContent(placeholder);
      newMapBoxMarker.setPopup(popup);
    });
  }

  render(): JSX.Element {
    return null;
  }
}
