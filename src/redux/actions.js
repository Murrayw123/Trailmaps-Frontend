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
export const CHANGE_SIDEBAR_DATA = "CHANGE_SIDEBAR_DATA";
export const SET_OPEN_MENUS = "SET_OPEN_MENUS";
export const OPEN_DISTANCE_TAB = "OPEN_DISTANCE_TAB";
export const FETCH_MAPS_SUCCESS = "FETCH_MAPS_SUCCESS";
export const WIPE_START_MARKER = "WIPE_START_MARKER";
export const WIPE_END_MARKER = "WIPE_END_MARKER";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const TOGGLE_LIVE_TRAIL_USERS = "TOGGLE_LIVE_TRAIL_USERS";
export const SHOW_MARKER_ADD_MODAL = "SHOW_MARKER_ADD_MODAL";
export const LAT_LNG_FROM_CONTEXT = "LAT_LNG_FROM_CONTEXT";
export const SHOULD_SHOW_CONTEXT_MENU = "SHOULD_SHOW_CONTEXT_MENU";
export const FETCH_ELEVATION_LOADING = "FETCH_ELEVATION_LOADING";
export const CHANGE_ELEVATION_DATA = "CHANGE_ELEVATION_DATA";

// Handle HTTP errors since fetch won't.
export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN,
});

export const fetchDataSuccess = (initMapInfo) => ({
  type: FETCH_DATA_SUCCESS,
  payload: { initMapInfo },
});

export const fetchMarkerSuccess = (markers) => ({
  type: FETCH_MARKERS_SUCCESS,
  payload: { markers },
});

export const fetchMapsSuccess = (maps) => ({
  type: FETCH_MAPS_SUCCESS,
  payload: { maps },
});

export const fetchDataError = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: { error },
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users },
});

export const addMapMarkerStart = (marker) => ({
  type: ADD_MAP_MARKER_START,
  payload: marker,
});

export const addMapMarkerEnd = (marker) => ({
  type: ADD_MAP_MARKER_END,
  payload: marker,
});

export const changeZoomLevel = (zoomLevel) => ({
  type: CHANGE_ZOOM_LEVEL,
  payload: zoomLevel,
});

export const changeFocusPoint = (newLatLng) => ({
  type: CHANGE_FOCUS_POINT,
  payload: newLatLng,
});

export const storeDistance = (marker) => ({
  type: CALC_DISTANCE,
  payload: marker,
});

export const storeElevation = (marker) => ({
  type: CALC_ELEVATION,
  payload: marker,
});

export const storeCustomTrack = (path) => ({
  type: STORE_CUSTOM_TRACK,
  payload: path,
});

export const findTrailMarker = (data) => ({
  type: FIND_TRAIL_MARKERS,
  payload: data,
});

export const filterTrailMarkers = (markerTypes) => ({
  type: FILTER_TRAIL_MARKERS,
  payload: markerTypes,
});

export const changeTerrain = (terrainKey) => ({
  type: CHANGE_TERRAIN,
  payload: terrainKey,
});

export const setStartPoint = (point) => ({
  type: SET_START_POINT,
  payload: point,
});

export const setEndPoint = (point) => ({
  type: SET_END_POINT,
  payload: point,
});

export const storeFocusMarker = (marker) => ({
  type: STORE_FOCUS_MARKER,
  payload: marker,
});

export const setCustomDistanceMarker = (latlng) => ({
  type: SET_CUSTOM_DISTANCE_MARKER,
  payload: latlng,
});

export const wipeMarkersAndPath = () => ({
  type: WIPE_MARKERS_AND_PATH,
});

export const wipeMarkers = () => ({
  type: WIPE_MARKERS,
});

export const wipeStartMarker = () => ({
  type: WIPE_START_MARKER,
});

export const wipeEndMarker = () => ({
  type: WIPE_END_MARKER,
});

export const allowCustomPath = (bool) => ({
  type: ALLOW_CUSTOM_PATH,
  payload: bool,
});

export const changeSideBarData = (blurb, default_image) => ({
  type: CHANGE_SIDEBAR_DATA,
  payload: { blurb: blurb, image: default_image },
});

export const setOpenMenus = (menuKeys) => ({
  type: SET_OPEN_MENUS,
  payload: menuKeys,
});

export const openDistanceTab = () => ({
  type: OPEN_DISTANCE_TAB,
});

export const toggleLiveTrailUsers = (bool) => ({
  type: TOGGLE_LIVE_TRAIL_USERS,
  payload: bool,
});

export const showMarkerAddModal = (bool) => ({
  type: SHOW_MARKER_ADD_MODAL,
  payload: bool,
});

export const setLatLngFromContextClick = (object) => ({
  type: LAT_LNG_FROM_CONTEXT,
  payload: object,
});

export const shouldShowContextMenu = (bool) => ({
  type: SHOULD_SHOW_CONTEXT_MENU,
  payload: bool,
});

export const fetchElevationLoading = (bool) => ({
  type: FETCH_ELEVATION_LOADING,
  payload: bool,
});

export const changeElevationData = (data) => ({
  type: CHANGE_ELEVATION_DATA,
  payload: data,
});
