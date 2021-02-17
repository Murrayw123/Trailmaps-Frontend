import { MapboxMarkerProps } from "Interfaces/Marker";
import mapboxgl from "mapbox-gl";

export class MapboxMarkerService {
  private _map: mapboxgl.Map;

  init(map: mapboxgl.Map) {
    this._map = map;
  }

  public setMarker(props: MapboxMarkerProps): void {
    console.log("setting a new marker!", props);
    const {
      key,
      position,
      icon,
      draggable = false,
      className,
      onDragStart,
      onDragEnd,
    } = props;
    const newMarker = new mapboxgl.Marker({
      draggable: draggable,
    })
      .setLngLat(position)
      .setPopup(
        new mapboxgl.Popup({ className: className }).setHTML(
          "<h1> Hello World! </h1>"
        )
      )
      .addTo(this._map);

    if (draggable) {
      newMarker.on("dragstart", onDragStart);
      newMarker.on("dragend", onDragEnd);
    }
  }
}
