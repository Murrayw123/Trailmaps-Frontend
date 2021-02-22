import { MapData } from "Interfaces/MapData";
import {CustomMapPoint, Marker} from "Interfaces/Marker";

export interface GlobalState {
  data: MapData;
  loadingTrack: boolean;
  loadingMarkers: boolean;
  error: any;
  poiMarkers: Array<Marker>;
  distancePoint: any;
  mapMarkerTypes: Array<any>;
  distance: number;
  elevation: Array<any>;
  customDistance: Array<any>;
  customPath: any;
  zoom: number;
  center: number;
  filters: Array<any>;
  startPoint: any;
  endPoint: any;
  focusMarker: any;
  customDistanceMarker: CustomMapPoint;
  mapMarkerStart: any;
  mapMarkerEnd: any;
  allowCustomPath: boolean;
  sideBarImage: any;
  sideBarBlurb: any;
  openKeys: Array<string>;
  allMaps: Array<any>;
  showLiveTrailUsers: boolean;
  liveTrailUsers: Array<any>;
  focusTrailUser: Array<any>;
  shouldShowModal: boolean;
  latLngFromContext: { lat: number; lng: number };
  shouldShowContextMenuStatus: boolean;
  fetchElevationLoading: boolean;
  elevationData: number;
  mapMarkers: any;
}