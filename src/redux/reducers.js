import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_MARKERS_SUCCESS,
  CALC_DISTANCE,
  CALC_ELEVATION,
  STORE_CUSTOM_TRACK,
  CHANGE_ZOOM_LEVEL,
  CHANGE_FOCUS_POINT,
  FIND_TRAIL_MARKERS,
  FILTER_TRAIL_MARKERS,
  CHANGE_TERRAIN,
  SET_START_POINT,
  SET_END_POINT,
  STORE_FOCUS_MARKER,
  SET_CUSTOM_DISTANCE_MARKER,
  ADD_MAP_MARKER_START,
  ADD_MAP_MARKER_END,
  WIPE_MARKERS_AND_PATH,
  WIPE_MARKERS,
  ALLOW_CUSTOM_PATH
} from "./actions";

const initialState = {
  data: [],
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
  allowCustomPath: false
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loadingTrack: false,
        data: action.payload.initMapInfo,
        center: [
          action.payload.initMapInfo.startpointlat,
          action.payload.initMapInfo.startpointlng
        ],
        filters: action.payload.initMapInfo.filters
      };

    case FETCH_MARKERS_SUCCESS:
      return {
        ...state,
        loadingMarkers: false,
        poiMarkers: action.payload.markers
      };

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: []
      };

    case ADD_MAP_MARKER_START:
      return {
        ...state,
        mapMarkerStart: action.payload
      };

    case ADD_MAP_MARKER_END:
      return {
        ...state,
        mapMarkerEnd: action.payload
      };
    case CALC_DISTANCE:
      return {
        ...state,
        customDistance: [...state.customDistance, action.payload]
      };
    case CALC_ELEVATION:
      return {
        ...state,
        mapMarkers: [...state.mapMarkers, action.payload]
      };
    case STORE_CUSTOM_TRACK:
      return {
        ...state,
        customPath: {
          path: action.payload.path,
          distance: action.payload.distance,
          elevationGain: action.payload.elevationGain,
          elevationLoss: action.payload.elevationLoss,
          elevationChartData: action.payload.chartData
        }
      };
    case CHANGE_ZOOM_LEVEL:
      return {
        ...state,
        zoom: action.payload
      };

    case CHANGE_FOCUS_POINT:
      return {
        ...state,
        center: action.payload
      };

    case FIND_TRAIL_MARKERS:
      return {
        ...state,
        mapMarkerTypes: action.payload
      };

    case FILTER_TRAIL_MARKERS:
      return {
        ...state,
        filters: action.payload
      };

    case CHANGE_TERRAIN:
      return {
        ...state,
        terrain: action.payload
      };

    case SET_START_POINT:
      return {
        ...state,
        startPoint: action.payload
      };

    case SET_END_POINT:
      return {
        ...state,
        endPoint: action.payload
      };

    case STORE_FOCUS_MARKER:
      return {
        ...state,
        focusMarker: action.payload
      };

    case SET_CUSTOM_DISTANCE_MARKER:
      return {
        ...state,
        customDistanceMarker: action.payload
      };

    case WIPE_MARKERS_AND_PATH:
      return {
        ...state,
        mapMarkerStart: null,
        mapMarkerEnd: null,
        customPath: {},
        customDistance: [],
        startPoint: {},
        endPoint: {}
      };

    case WIPE_MARKERS:
      return {
        ...state,
        mapMarkerStart: null,
        mapMarkerEnd: null
      };

    case ALLOW_CUSTOM_PATH:
      return {
        ...state,
        allowCustomPath: action.payload
      };

    default:
      return state;
  }
}
