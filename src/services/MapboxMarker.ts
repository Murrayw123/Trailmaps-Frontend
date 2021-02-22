import { MapboxMarkerProps } from "Interfaces/Marker";
import mapboxgl from "mapbox-gl";
import { createMapBoxElement } from "services/helpers";

export class MapboxMarkerService {
  private _map: mapboxgl.Map;

  init(map: mapboxgl.Map) {
    this._map = map;
  }

  public setMarker(props: MapboxMarkerProps): mapboxgl.Marker {
    const {
      key,
      position,
      icon,
      draggable = false,
      className,
      onDragStart,
      onDragEnd,
    } = props;

    const markerElement = createMapBoxElement(icon);

    const newMarker = new mapboxgl.Marker({
      element: markerElement,
      draggable: draggable,
    })
      .setLngLat(position)
      .addTo(this._map);

    if (draggable) {
      newMarker.on("dragstart", onDragStart);
      newMarker.on("dragend", onDragEnd);
    }

    return newMarker;
  }
}
