import mapboxgl from "mapbox-gl";
import { createMapBoxElement } from "services/helpers";
import { MapBoxMarkerReactWrapperProps } from "components/MapboxComponents/MapboxMarker";

export class MapboxMarkerService {
  private _map: mapboxgl.Map;

  init(map: mapboxgl.Map): void {
    this._map = map;
  }

  public setMarker(props: MapBoxMarkerReactWrapperProps): mapboxgl.Marker {
    const {
      position,
      icon,
      draggable = false,
      onDragStart,
      onDragEnd,
      onClick,
      marker,
    } = props;

    const markerElement = createMapBoxElement(icon);
    markerElement.classList.add(marker.marker_type);

    // add the title in, remove spaces
    markerElement.classList.add(
      marker.marker_title.replace(/ /g, "").toLowerCase()
    );

    markerElement.onclick = (e) => {
      onClick(e);
    };

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
