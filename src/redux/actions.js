import {
  food_groupings,
  business_groupings
} from "../components/helpers/iconsData";
import * as _ from "lodash";

import { URLPREFIX } from "../config.js";
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

export function fetchElevation(lat, lng) {
  return dispatch => {
    dispatch(fetchElevationLoading(true));
    fetch(
      `http://dev.virtualearth.net/REST/v1/Elevation/List?points=${lat},${lng}&key=Ahj6mcvlG04XGZyebUbWKYsWBAXBF18DeXctHOmwCrcxj-C4TvQKGCBmPVfnq0Z2`
    )
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        let elevationData = json.resourceSets[0].resources[0].elevations[0];
        dispatch(changeElevationData(elevationData));
        dispatch(fetchElevationLoading(false));
      })
      .catch(error => {
        console.error(error, "Get elevations error");
      });
  };
}

export function fetchData(mapstring) {
  return dispatch => {
    dispatch(fetchDataBegin());
    fetch(URLPREFIX + "/api/maps/" + mapstring)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        let clonedJson = _.cloneDeep(json);
        let filters = [];
        clonedJson.default_filters.forEach(filter => filters.push(filter.type));
        clonedJson.filters = filters;
        dispatch(changeZoomLevel(clonedJson.zoom_level));
        dispatch(
          changeSideBarData(clonedJson.map_blurb, clonedJson.default_image)
        );
        dispatch(fetchDataSuccess(clonedJson));
        return clonedJson;
      })
      .catch(error => {
        console.error(error, "MapInfo");
        dispatch(fetchDataError(error));
      });
  };
}

export function fetchMarkers(mapstring) {
  return dispatch => {
    dispatch(fetchDataBegin());
    fetch(URLPREFIX + "/api/markers?map_alias=" + mapstring)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const data = json.map(el => {
          return {
            marker_id: el.id,
            marker_type: el.marker_type,
            marker_lat: el.marker_lat,
            marker_lng: el.marker_lng,
            marker_info: el.marker_info,
            marker_title: el.marker_title,
            marker_blurb: el.marker_blurb,
            default_image: el.default_image
          };
        });
        return data;
      })
      .then(data => {
        let mapMarkerTypes = [];
        data.forEach(marker => {
          if (
            food_groupings.includes(marker.marker_type) &&
            !mapMarkerTypes.includes("drinks & dining")
          ) {
            mapMarkerTypes.push("drinks & dining");
          } else if (
            business_groupings.includes(marker.marker_type) &&
            !mapMarkerTypes.includes("trail businesses")
          ) {
            mapMarkerTypes.push("trail businesses");
          } else if (
            !mapMarkerTypes.includes(marker.marker_type) &&
            !business_groupings.includes(marker.marker_type) &&
            !food_groupings.includes(marker.marker_type)
          ) {
            mapMarkerTypes.push(marker.marker_type);
          }
        });
        dispatch(findTrailMarker(mapMarkerTypes));
        dispatch(fetchMarkerSuccess(data));
      })
      .catch(error => {
        console.error(error, "Markers");
        dispatch(fetchDataError(error));
      });
  };
}

export function fetchOtherMaps() {
  return dispatch => {
    dispatch(fetchDataBegin());
    fetch(URLPREFIX + "/api/map_preview")
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchMapsSuccess(data));
      })
      .catch(error => {
        console.error(error, "Many Maps Info");
        dispatch(fetchDataError(error));
      });
  };
}

export function fetchTrailUsers(mapString) {
  return dispatch => {
    dispatch(fetchDataBegin());
    fetch(URLPREFIX + "/api/spotuserswithlocation?=map_alias=" + mapString)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchUsersSuccess(data));
      })
      .catch(error => {
        console.error(error, "Trail Users");
        dispatch(fetchDataError(error));
      });
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

export const fetchMapsSuccess = maps => ({
  type: FETCH_MAPS_SUCCESS,
  payload: { maps }
});

export const fetchDataError = error => ({
  type: FETCH_DATA_FAILURE,
  payload: { error }
});

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users }
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

export const wipeStartMarker = () => ({
  type: WIPE_START_MARKER
});

export const wipeEndMarker = () => ({
  type: WIPE_END_MARKER
});

export const allowCustomPath = bool => ({
  type: ALLOW_CUSTOM_PATH,
  payload: bool
});

export const changeSideBarData = (blurb, default_image) => ({
  type: CHANGE_SIDEBAR_DATA,
  payload: { blurb: blurb, image: default_image }
});

export const setOpenMenus = menuKeys => ({
  type: SET_OPEN_MENUS,
  payload: menuKeys
});

export const openDistanceTab = () => ({
  type: OPEN_DISTANCE_TAB
});

export const toggleLiveTrailUsers = bool => ({
  type: TOGGLE_LIVE_TRAIL_USERS,
  payload: bool
});

export const showMarkerAddModal = bool => ({
  type: SHOW_MARKER_ADD_MODAL,
  payload: bool
});

export const setLatLngFromContextClick = object => ({
  type: LAT_LNG_FROM_CONTEXT,
  payload: object
});

export const shouldShowContextMenu = bool => ({
  type: SHOULD_SHOW_CONTEXT_MENU,
  payload: bool
});

export const fetchElevationLoading = bool => ({
  type: FETCH_ELEVATION_LOADING,
  payload: bool
});

export const changeElevationData = data => ({
  type: CHANGE_ELEVATION_DATA,
  payload: data
});
