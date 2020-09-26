import {
  ADD_MAP_MARKER_END,
  ADD_MAP_MARKER_START,
  ALLOW_CUSTOM_PATH,
  CALC_DISTANCE,
  CALC_ELEVATION,
  CHANGE_ELEVATION_DATA,
  CHANGE_FOCUS_POINT,
  CHANGE_SIDEBAR_DATA,
  CHANGE_TERRAIN,
  CHANGE_ZOOM_LEVEL,
  FETCH_DATA_BEGIN,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  FETCH_ELEVATION_LOADING,
  FETCH_MAPS_SUCCESS,
  FETCH_MARKERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  FILTER_TRAIL_MARKERS,
  FIND_TRAIL_MARKERS,
  LAT_LNG_FROM_CONTEXT,
  OPEN_DISTANCE_TAB,
  SET_CUSTOM_DISTANCE_MARKER,
  SET_END_POINT,
  SET_OPEN_MENUS,
  SET_START_POINT,
  SHOULD_SHOW_CONTEXT_MENU,
  SHOW_MARKER_ADD_MODAL,
  STORE_CUSTOM_TRACK,
  STORE_FOCUS_MARKER,
  TOGGLE_LIVE_TRAIL_USERS,
  WIPE_END_MARKER,
  WIPE_MARKERS,
  WIPE_MARKERS_AND_PATH,
  WIPE_START_MARKER,
} from "redux/actions";
import { Store } from "redux";

interface Data {
  cycling: boolean;
  default_filters: Array<any>;
  default_image: string;
  filters: Array<string>;
  horseriding: boolean;
  id: number;
  map_alias: string;
  map_blurb: string;
  map_stats: Array<any>;
  map_track: any;
  map_type: string;
  startpointlat: number;
  startpointlng: number;
  walking: boolean;
  zoom_level: number;
}

export interface GlobalState {
  data: Data;
  loadingTrack: boolean;
  loadingMarkers: boolean;
  error: any;
  poiMarkers: Array<any>;
  distancePoint: any;
  mapMarkerTypes: Array<any>;
  distance: number;
  elevation: Array<any>;
  customDistance: Array<any>;
  customPath: any;
  terrain: string;
  zoom: number;
  center: number;
  filters: Array<any>;
  startPoint: any;
  endPoint: any;
  focusMarker: any;
  customDistanceMarker: Array<any>;
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

export interface GlobalStateStore extends Store {
  getState: () => GlobalState;
}

const initialState: GlobalState = {
  data: {} as any,
  loadingTrack: true,
  loadingMarkers: true,
  error: null,
  poiMarkers: [],
  distancePoint: {},
  mapMarkerTypes: [],
  distance: 0,
  elevation: [],
  customDistance: [],
  customPath: {},
  terrain: "topo",
  zoom: 10,
  center: 0,
  filters: [],
  startPoint: {},
  endPoint: {},
  focusMarker: {},
  customDistanceMarker: [],
  mapMarkerStart: null,
  mapMarkerEnd: null,
  allowCustomPath: false,
  sideBarImage: null,
  sideBarBlurb: null,
  openKeys: ["menu", "sub6"],
  allMaps: [],
  showLiveTrailUsers: true,
  liveTrailUsers: [],
  focusTrailUser: null,
  shouldShowModal: false,
  latLngFromContext: { lat: 0, lng: 0 },
  shouldShowContextMenuStatus: false,
  fetchElevationLoading: true,
  elevationData: 0,
  mapMarkers: null,
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loadingTrack: false,
        data: action.payload.initMapInfo,
        center: [
          action.payload.initMapInfo.startpointlat,
          action.payload.initMapInfo.startpointlng,
        ],
        filters: action.payload.initMapInfo.filters,
      };

    case FETCH_MARKERS_SUCCESS:
      return {
        ...state,
        loadingMarkers: false,
        poiMarkers: action.payload.markers,
      };

    case FETCH_MAPS_SUCCESS:
      return {
        ...state,
        allMaps: action.payload.maps,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loadingMarkers: false,
        liveTrailUsers: action.payload.users,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        liveTrailUsers: [],
      };

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: [],
      };

    case ADD_MAP_MARKER_START:
      return {
        ...state,
        mapMarkerStart: action.payload,
      };

    case ADD_MAP_MARKER_END:
      return {
        ...state,
        mapMarkerEnd: action.payload,
      };
    case CALC_DISTANCE:
      return {
        ...state,
        customDistance: [...state.customDistance, action.payload],
      };
    case CALC_ELEVATION:
      return {
        ...state,
        mapMarkers: [...state.mapMarkers, action.payload],
      };
    case STORE_CUSTOM_TRACK:
      return {
        ...state,
        customPath: {
          path: action.payload.path,
          distance: action.payload.distance,
          elevationGain: action.payload.elevationGain,
          elevationLoss: action.payload.elevationLoss,
          elevationChartData: action.payload.chartData,
        },
      };
    case CHANGE_ZOOM_LEVEL:
      return {
        ...state,
        zoom: action.payload,
      };

    case CHANGE_FOCUS_POINT:
      return {
        ...state,
        center: action.payload,
      };

    case FIND_TRAIL_MARKERS:
      return {
        ...state,
        mapMarkerTypes: action.payload,
      };

    case FILTER_TRAIL_MARKERS:
      return {
        ...state,
        filters: action.payload,
      };

    case CHANGE_TERRAIN:
      return {
        ...state,
        terrain: action.payload,
      };

    case SET_START_POINT:
      return {
        ...state,
        startPoint: action.payload,
      };

    case SET_END_POINT:
      return {
        ...state,
        endPoint: action.payload,
      };

    case STORE_FOCUS_MARKER:
      return {
        ...state,
        focusMarker: action.payload,
      };

    case SET_CUSTOM_DISTANCE_MARKER:
      return {
        ...state,
        customDistanceMarker: action.payload,
      };

    case WIPE_MARKERS_AND_PATH:
      return {
        ...state,
        mapMarkerStart: null,
        mapMarkerEnd: null,
        customPath: {},
        customDistance: [],
        startPoint: {},
        endPoint: {},
      };

    case WIPE_MARKERS:
      return {
        ...state,
        mapMarkerStart: null,
        mapMarkerEnd: null,
      };

    case WIPE_START_MARKER:
      return {
        ...state,
        mapMarkerStart: null,
      };

    case WIPE_END_MARKER:
      return {
        ...state,
        mapMarkerEnd: null,
      };

    case ALLOW_CUSTOM_PATH:
      return {
        ...state,
        allowCustomPath: action.payload,
      };

    case CHANGE_SIDEBAR_DATA:
      return {
        ...state,
        sideBarImage: action.payload.image,
        sideBarBlurb: action.payload.blurb,
      };

    case SET_OPEN_MENUS:
      return {
        ...state,
        openKeys: action.payload,
      };

    case OPEN_DISTANCE_TAB:
      return {
        ...state,
        openKeys: [...state.openKeys, "distanceTab"],
      };
    default:
      return state;

    case TOGGLE_LIVE_TRAIL_USERS:
      return {
        ...state,
        showLiveTrailUsers: action.payload,
      };

    case SHOW_MARKER_ADD_MODAL:
      return {
        ...state,
        shouldShowModal: action.payload,
      };

    case LAT_LNG_FROM_CONTEXT:
      return {
        ...state,
        latLngFromContext: action.payload,
      };

    case SHOULD_SHOW_CONTEXT_MENU:
      return {
        ...state,
        shouldShowContextMenuStatus: action.payload,
      };

    case FETCH_ELEVATION_LOADING:
      return {
        ...state,
        fetchElevationLoading: action.payload,
      };

    case CHANGE_ELEVATION_DATA:
      return {
        ...state,
        elevationData: action.payload,
      };
  }
}