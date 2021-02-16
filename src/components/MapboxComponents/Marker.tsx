import { Component, useContext } from "react";
import { Context, ServicesContext } from "helpers/ServiceInit";
import mapboxgl, { LngLatLike } from "mapbox-gl";


interface Props {
  icon: string;
  key: number;
  position: LngLatLike;
  draggable?: boolean;
  className?: string;
}

// const Marker = (props: Props) => {
//   const mapboxMapService  = useContext(ServicesContext);
//   services.
//
//   return <></>;
// };

export class MapboxMarker extends Component<Props, never> {
  public context: Context;
  static contextType = ServicesContext;

  componentDidMount(): void {
    const map = this.context.mapBoxMapService.map;
    const { position } = this.props;
    new mapboxgl.Marker().setLngLat(position).addTo(map);
  }

  render(): JSX.Element {
    return null;
  }
}
