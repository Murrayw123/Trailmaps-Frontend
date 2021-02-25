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
      position,
      icon,
      draggable = false,
      onDragStart,
      onDragEnd,
      onClick,
    } = props;

    const markerElement = createMapBoxElement(icon);

    markerElement.onclick = (e) => {
      onClick(e);
    };

    const newMarker = new mapboxgl.Marker({
      element: markerElement,
      draggable: draggable,
    })
      .setLngLat(position)
      .addTo(this._map);

    // newMarker.on("click", () => {
    //   debugger;
    // });

    if (draggable) {
      newMarker.on("dragstart", onDragStart);
      newMarker.on("dragend", onDragEnd);
    }

    return newMarker;
  }
}
