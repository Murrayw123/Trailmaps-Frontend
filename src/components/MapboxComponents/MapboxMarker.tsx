import React, { Component } from "react";
import { Context, ServicesContext } from "helpers/ServiceInit";
import { MapboxMarkerProps, Marker } from "Interfaces/Marker";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import { Popup } from "components/Popup";

interface Props extends MapboxMarkerProps {
  marker: Partial<Marker>;
  hasPopup: boolean;
}

export class MapboxMarker extends Component<Props, never> {
  public context: Context;
  static contextType = ServicesContext;

  private _marker: mapboxgl.Marker;

  componentDidMount(): void {
    const { marker, hasPopup } = this.props;
    this.context.servicesReady(() => {
      this._marker = this.context.mapboxMarkerAdd.setMarker(this.props);

      const info = marker.marker_info;
      const title = marker.marker_title;
      const placeholder = document.createElement("div");

      if (hasPopup) {
        ReactDOM.render(
          <Popup title={title} info={info} onClick={null} />,
          placeholder
        );

        const popup = new mapboxgl.Popup().setDOMContent(placeholder);
        this._marker.setPopup(popup);
      }
    });
  }

  componentWillUnmount(): void {
    if (this._marker) {
      this._marker.remove();
    }
  }

  render(): JSX.Element {
    const { marker } = this.props;
    if (this._marker) {
      this._marker.setLngLat([marker.marker_lng, marker.marker_lat]);
    }
    return null;
  }
}
