import { LngLatLike } from "mapbox-gl";
import { OnClickCallback } from "Interfaces/Types";

export interface Marker {
  id: number;
  type: string;
  lat: number;
  lng: number;
  info: Array<{ title: string; value: string }>;
  title: string;
  blurb: string;
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
  onClick: (e: MouseEvent) => void;
}

export interface CustomMapPoint {
  lat: number;
  lng: number;
  title: string;
  distance?: number;
}
