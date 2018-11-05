import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_MARKERS_SUCCESS,
  ADD_MAP_MARKER,
  CALC_DISTANCE,
  CALC_ELEVATION,
  STORE_CUSTOM_TRACK,
  CHANGE_ZOOM_LEVEL,
  CHANGE_FOCUS_POINT,
  FIND_TRAIL_MARKERS,
  FILTER_TRAIL_MARKERS
} from './actions'

const initialState = {
  data: [],
  loadingTrack: true,
  loadingMarkers: true,
  error: null,
  mapMarkers: [],
  poiMarkers: [],
  mapMarkerTypes: [],
  distance: 0,
  elevation: [],
  customDistance: [],
  customPath: {},
  zoom: 10,
  center: 0,
  filters: []
}

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loadingTrack: false,
        data: action.payload.initMapInfo,
        center: [
          action.payload.initMapInfo.startpointlat,
          action.payload.initMapInfo.startpointlng
        ]
      }

    case FETCH_MARKERS_SUCCESS:
      return {
        ...state,
        loadingMarkers: false,
        poiMarkers: action.payload.markers
      }

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: []
      }

    case ADD_MAP_MARKER:
      return {
        ...state,
        mapMarkers: [...state.mapMarkers, action.payload]
      }
    case CALC_DISTANCE:
      return {
        ...state,
        customDistance: [...state.customDistance, action.payload]
      }
    case CALC_ELEVATION:
      return {
        ...state,
        mapMarkers: [...state.mapMarkers, action.payload]
      }
    case STORE_CUSTOM_TRACK:
      return {
        ...state,
        customPath: {
          path: action.payload.path,
          distance: action.payload.distance
        }
      }
    case CHANGE_ZOOM_LEVEL:
      return {
        ...state,
        zoom: action.payload
      }

    case CHANGE_FOCUS_POINT:
      return {
        ...state,
        center: action.payload
      }

    case FIND_TRAIL_MARKERS:
      return {
        ...state,
        mapMarkerTypes: action.payload
      }

    case FILTER_TRAIL_MARKERS:
      return {
        ...state,
        filters: action.payload
      }

    default:
      return state
  }
}
