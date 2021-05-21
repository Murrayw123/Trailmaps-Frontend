import mapboxgl from "mapbox-gl";
import { createMapBoxElement } from "services/helpers";
import { MapBoxMarkerReactWrapperProps } from "components/MapboxComponents/MapboxMarker";

export class MapboxMarkerService {
  private _map: mapboxgl.Map;
  private _markers: Array<mapboxgl.Marker>;

  init(map: mapboxgl.Map): void {
    this._map = map;
    this._markers = [];
  }

  // TODO - sort out the whole popup thing
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
    markerElement.classList.add(marker.type);
    // add the title in, remove spaces
    markerElement.classList.add(marker.title.replace(/ /g, "").toLowerCase());

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

    markerElement.onclick = (e) => {
      e.stopPropagation();
      this._disableAllPopups();
      newMarker.togglePopup();
      onClick(e);
    };

    this._markers.push(newMarker);

    return newMarker;
  }

  private _disableAllPopups() {
    this._markers.forEach((marker) => {
      if (marker.getPopup()?.isOpen()) {
        marker.togglePopup();
      }
    });
  }
}
