import { CustomMapPoint, Marker } from "Interfaces/Marker";
import { CustomPath } from "Interfaces/CustomPath";
import { MapData } from "objects/MapData";
import { Store } from "redux";
import { AllMaps } from "Interfaces/AllMaps";

export interface GlobalState {
  mapData: MapData;
  loadingTrack: boolean;
  loadingMarkers: boolean;
  error: any;
  poiMarkers: Array<Marker>;
  distancePoint: any;
  mapMarkerTypes: Array<any>;
  distance: number;
  elevation: Array<any>;
  customDistance: Array<any>;
  customPath: CustomPath;
  zoom: number;
  center: { lat: number; lng: number };
  filters: Array<any>;
  startPoint: Marker;
  endPoint: Marker;
  focusMarker: any;
  customDistanceMarker: CustomMapPoint;
  mapMarkerStart: CustomMapPoint;
  mapMarkerFinish: CustomMapPoint;
  allowCustomPath: boolean;
  sideBarImage: any;
  sideBarBlurb: any;
  openKeys: Array<string>;
  allMaps: AllMaps;
  showLiveTrailUsers: boolean;
  liveTrailUsers: Array<any>;
  focusTrailUser: Array<any>;
  shouldShowModal: boolean;
  latLngFromContext: { lat: number; lng: number };
  shouldShowContextMenuStatus: boolean;
  fetchElevationLoading: boolean;
  elevationData: number;
  mapMarkers: any;
  mapPitched: boolean;
}

export interface IStore extends Store {
  getState: () => GlobalState;
}
