import { Component } from "react";
import { Context, ServicesContext } from "helpers/ServiceInit";
import { GlobalState } from "Interfaces/GlobalState";
import mapboxgl from "mapbox-gl";

interface Props {
  color: string;
  path: GlobalState["customPath"]["path"];
}

export class MapboxGeoJSON extends Component<Props, never> {
  private _map: mapboxgl.Map;

  public context: Context;
  static contextType = ServicesContext;

  componentDidMount(): void {
    this.create();
  }

  create(): void {
    this._map = this.context.mapBoxMapService.map;
    const { color, path } = this.props;

    this._map.addSource("customPath", {
      type: "geojson",
      data: (path as unknown) as any,
    });

    this._map.addLayer({
      id: "customPath",
      type: "line",
      source: "customPath",
      layout: {},
      paint: {
        "line-width": 3,
        "line-color": color,
      },
    });
  }

  destroy(): void {
    this._map.removeLayer("customPath");
    this._map.removeSource("customPath");
  }

  componentWillUnmount(): void {
    this.destroy();
  }

  componentDidUpdate(): void {
    (this._map.getSource("customPath") as any).setData(this.props.path);
  }

  render(): JSX.Element {
    return null;
  }
}
