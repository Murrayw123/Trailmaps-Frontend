import { Component } from "react";
import { Context, ServicesContext } from "helpers/ServiceInit";
import { MapboxMarkerProps } from "Interfaces/Marker";

export class MapboxMarker extends Component<MapboxMarkerProps, never> {
  public context: Context;
  static contextType = ServicesContext;

  componentDidMount(): void {
    this.context.servicesReady(() => {
      this.context.mapboxMarkerAdd.setMarker(this.props);
    });
  }

  render(): JSX.Element {
    return null;
  }
}
