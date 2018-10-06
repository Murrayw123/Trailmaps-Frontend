import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_MARKERS_SUCCESS,
  ADD_MAP_MARKER,
  CALC_DISTANCE,
  CALC_ELEVATION
} from './actions'

const initialState = {
  data: [],
  loadingTrack: true,
  loadingMarkers: true,
  error: null,
  mapMarkers: [],
  poiMarkers: [],
  distance: 0,
  elevation: [],
  customDistance: []
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
        data: action.payload.initMapInfo
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

    default:
      return state
  }
}
