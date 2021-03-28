export type MapDataStats = Array<{ key: string; value: string }>

export interface IMapData {
  default_filters: Array<{ type: string }>;
  default_image: string;
  id: number;
  alias: string;
  blurb: string;
  stats: MapDataStats;
  track: JSON;
  type: string;
  start_point_lat: number;
  start_point_lng: number;
  zoom_level: number;
  allowed_transport: Array<string>;
}
