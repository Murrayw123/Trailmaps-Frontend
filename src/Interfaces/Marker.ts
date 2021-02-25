import { LngLatLike } from "mapbox-gl";
import { OnClickCallback } from "Interfaces/Types";

export interface Marker {
  id: number;
  marker_type: string;
  marker_lat: number;
  marker_lng: number;
  marker_info: Array<{ title: string; value: string }>;
  marker_title: string;
  marker_blurb: string;
  default_image: string;
}

export interface MapboxMarkerProps {
  icon: string;
  key: number;
  position: LngLatLike;
  className?: string;
  draggable?: boolean;
  onDragStart?: OnClickCallback;
  onDragEnd?: OnClickCallback;
  onClick?: (e: MouseEvent) => void;
}

export interface CustomMapPoint {
  marker_lat: number;
  marker_lng: number;
  marker_title: string;
  distance?: number;
}
