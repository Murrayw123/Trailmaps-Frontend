export const FETCH_DATA_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_DATA_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_MARKERS_SUCCESS = "FETCH_MARKERS_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const CALC_DISTANCE = "CALC_DISTANCE";
export const CALC_ELEVATION = "CALC_ELEVATION";
export const STORE_CUSTOM_TRACK = "STORE_CUSTOM_TRACK";
export const CHANGE_ZOOM_LEVEL = "CHANGE_ZOOM_LEVEL";
export const CHANGE_FOCUS_POINT = "CHANGE_FOCUS_POINT";
export const FIND_TRAIL_MARKERS = "FIND_TRAIL_MARKERS";
export const FILTER_TRAIL_MARKERS = "FILTER_TRAIL_MARKERS";
export const CHANGE_TERRAIN = "CHANGE_TERRAIN";
export const SET_START_POINT = "SET_START_POINT";
export const SET_END_POINT = "SET_END_POINT";
export const STORE_FOCUS_MARKER = "STORE_FOCUS_MARKER";
export const SET_CUSTOM_DISTANCE_MARKER = "SET_CUSTOM_DISTANCE_MARKER";
export const ADD_MAP_MARKER_START = "ADD_MAP_MARKER_START";
export const ADD_MAP_MARKER_END = "ADD_MAP_MARKER_END";
export const WIPE_MARKERS_AND_PATH = "WIPE_MARKERS_AND_PATH";
export const WIPE_MARKERS = "WIPE_MARKERS";
export const ALLOW_CUSTOM_PATH = "ALLOW_CUSTOM_PATH";

export function fetchData(mapstring) {
  return dispatch => {
    dispatch(fetchDataBegin());
    fetch("http://localhost:8082/api/mapinfo/" + mapstring)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const filters = [];
        json.Default_filters.forEach(filter => filters.push(filter.type));
        const data = {
          id: json.Id,
          map_name: json.Map_name,
          map_alias: json.Map_alias,
          map_type: json.Map_type,
          map_track: json.Map_track,
          startpointlat: json.Startpointlat,
          startpointlng: json.Startpointlng,
          filters: filters
        };
        dispatch(fetchDataSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchDataError(error)));
  };
}

export function fetchMarkers(mapstring) {
  return dispatch => {
    dispatch(fetchDataBegin());
    fetch("http://localhost:8082/api/markers/" + mapstring)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const data = json.map(el => {
          return {
            marker_id: el.Id,
            marker_type: el.Marker_type,
            marker_lat: el.Marker_lat,
            marker_lng: el.Marker_lng,
            marker_info: el.Marker_info,
            marker_title: el.Marker_title
          };
        });
        return data;
      })
      .then(data => {
        let mapMarkerTypes = [];
        data.forEach(marker => {
          if (!mapMarkerTypes.includes(marker.marker_type)) {
            mapMarkerTypes.push(marker.marker_type);
          }
        });
        dispatch(findTrailMarker(mapMarkerTypes));
        dispatch(fetchMarkerSuccess(data));
      })
      .catch(error => dispatch(fetchDataError(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN
});

export const fetchDataSuccess = initMapInfo => ({
  type: FETCH_DATA_SUCCESS,
  payload: { initMapInfo }
});

export const fetchMarkerSuccess = markers => ({
  type: FETCH_MARKERS_SUCCESS,
  payload: { markers }
});

export const fetchDataError = error => ({
  type: FETCH_DATA_FAILURE,
  payload: { error }
});

export const addMapMarkerStart = marker => ({
  type: ADD_MAP_MARKER_START,
  payload: marker
});

export const addMapMarkerEnd = marker => ({
  type: ADD_MAP_MARKER_END,
  payload: marker
});

export const changeZoomLevel = zoomLevel => ({
  type: CHANGE_ZOOM_LEVEL,
  payload: zoomLevel
});

export const changeFocusPoint = newLatLng => ({
  type: CHANGE_FOCUS_POINT,
  payload: newLatLng
});

export const storeDistance = marker => ({
  type: CALC_DISTANCE,
  payload: marker
});

export const storeElevation = marker => ({
  type: CALC_ELEVATION,
  payload: marker
});

export const storeCustomTrack = path => ({
  type: STORE_CUSTOM_TRACK,
  payload: path
});

export const findTrailMarker = data => ({
  type: FIND_TRAIL_MARKERS,
  payload: data
});

export const filterTrailMarkers = markerTypes => ({
  type: FILTER_TRAIL_MARKERS,
  payload: markerTypes
});

export const changeTerrain = terrainKey => ({
  type: CHANGE_TERRAIN,
  payload: terrainKey
});

export const setStartPoint = point => ({
  type: SET_START_POINT,
  payload: point
});

export const setEndPoint = point => ({
  type: SET_END_POINT,
  payload: point
});

export const storeFocusMarker = marker => ({
  type: STORE_FOCUS_MARKER,
  payload: marker
});

export const setCustomDistanceMarker = latlng => ({
  type: SET_CUSTOM_DISTANCE_MARKER,
  payload: latlng
});

export const wipeMarkersAndPath = () => ({
  type: WIPE_MARKERS_AND_PATH
});

export const wipeMarkers = () => ({
  type: WIPE_MARKERS
});

export const allowCustomPath = bool => ({
  type: ALLOW_CUSTOM_PATH,
  payload: bool
});
