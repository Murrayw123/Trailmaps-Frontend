import { Store } from "redux";
import _ from "lodash";
import { GlobalState, GlobalStateStore } from "redux/reducers";
import {
  addMapMarkerEnd,
  addMapMarkerStart,
  changeSideBarData,
  fetchElevation,
  openDistanceTab,
  setEndPoint,
  setLatLngFromContextClick,
  setStartPoint,
  shouldShowContextMenu,
  storeCustomTrack,
  storeFocusMarker,
  wipeMarkersAndPath,
} from "redux/actions";
import { findPath } from "helpers/PathCalculator";
import { business_groupings, food_groupings } from "helpers/iconsData";

const BUTTON = "button";
const CUSTOM_MAP_POINT = "Custom Map Point";
export const START = "start";
export const END = "end";
const DISTANCE_TAB = "distanceTab";

const TRAIL_BUSINESSES = "trail businesses";
const DRINKS_DINING = "drinks & dining";

export class MarkerAddService {
  private _store: GlobalStateStore;
  private _allowCustomPath: Boolean;
  private _startPoint: GlobalState["startPoint"];
  private _endPoint: GlobalState["endPoint"];
  private _poiMarkers: GlobalState["poiMarkers"];
  private _openKeys: GlobalState["openKeys"];
  private _data: GlobalState["data"];
  private _focusMarker: GlobalState["focusMarker"];
  private _filters: GlobalState["filters"];

  constructor(store: Store) {
    this._store = store;

    this._store.subscribe(() => {
      const state = this._store.getState();

      this._allowCustomPath = state.allowCustomPath;
      this._startPoint = state.startPoint;
      this._endPoint = state.endPoint;
      this._focusMarker = state.focusMarker;
      this._poiMarkers = state.poiMarkers;

      this._openKeys = state.openKeys;

      this._filters = state.filters;
      this._data = state.data;
    });
  }

  public checkMarkers(e: any): void {
    if (e.originalEvent.target.type !== BUTTON) {
      this._store.dispatch(shouldShowContextMenu(false));
    }

    const startPointCheckEmpty = _.isEmpty(this._startPoint);
    const endPointCheckEmpty = _.isEmpty(this._endPoint);

    //allow a maximum of two clicks before resetting the path
    if (this._allowCustomPath) {
      if (startPointCheckEmpty) {
        e.startEnd = START;
        this._addCustomMarker(e);
      } else if (endPointCheckEmpty) {
        e.startEnd = END;
        this._addCustomMarker(e);
      } else {
        e.startEnd = START;
        this._store.dispatch(wipeMarkersAndPath());
        this._addCustomMarker(e);
      }
    }
  }

  private _addCustomMarker(e: any): void {
    const newMarker = {
      marker_title: CUSTOM_MAP_POINT,
      marker_lat: e.latlng.lat,
      marker_lng: e.latlng.lng,
    };
    if (!this._openKeys.includes(DISTANCE_TAB)) {
      this._store.dispatch(openDistanceTab());
    }
    if (e.startEnd === START) {
      this._store.dispatch(addMapMarkerStart(newMarker));
      this._store.dispatch(setStartPoint(newMarker));
    } else {
      this._store.dispatch(addMapMarkerEnd(newMarker));
      this._store.dispatch(setEndPoint(newMarker));
    }
  }

  public createDraggableMarker(marker: any, startOrEnd: string): void {
    const startPointCheckEmpty = _.isEmpty(this._startPoint);
    const endPointCheckEmpty = _.isEmpty(this._endPoint);

    const updatedMarker = {
      marker_title: CUSTOM_MAP_POINT,
      marker_lat: marker.target._latlng.lat,
      marker_lng: marker.target._latlng.lng,
    };

    if (startOrEnd === START) {
      this._store.dispatch(addMapMarkerStart(updatedMarker));
      this._store.dispatch(setStartPoint(updatedMarker));
    } else {
      this._store.dispatch(addMapMarkerEnd(updatedMarker));
      this._store.dispatch(setEndPoint(updatedMarker));
    }
    if (!startPointCheckEmpty && !endPointCheckEmpty) {
      //if the draggable marker is being updated on an existing path
      this._updatePath();
    }
  }

  private _updatePath(): void {
    const pathAndDistance = findPath(
      this._data.map_track,
      this._startPoint,
      this._endPoint
    );
    this._store.dispatch(storeCustomTrack(pathAndDistance));
  }

  public onMapRightClick(event: any): void {
    this._store.dispatch(
      setLatLngFromContextClick({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      })
    );

    this._store.dispatch<any>(
      fetchElevation(event.latlng.lat, event.latlng.lng)
    );

    this._store.dispatch(shouldShowContextMenu(true));
  }

  public onMarkerClick(marker: any): void {
    this._store.dispatch(storeFocusMarker(marker));
    this._store.dispatch(
      changeSideBarData(marker.marker_blurb, marker.default_image)
    );
  }

  public get markersInFilteredList(): Array<any> {
    return this._poiMarkers.filter((marker) => this._shouldShowMarker(marker));
  }

  private _shouldShowMarker(marker: any): boolean {
    const business = business_groupings.includes(marker.marker_type);
    const food = food_groupings.includes(marker.marker_type);

    if (
      this._filters.includes(marker.marker_type) ||
      (business && this._filters.includes(TRAIL_BUSINESSES)) ||
      (food && this._filters.includes(DRINKS_DINING))
    ) {
      return true;
    }

    if (!_.isEmpty(this._startPoint)) {
      if (this._startPoint.marker_id === marker.marker_id) {
        return true;
      }
    }
    if (!_.isEmpty(this._endPoint)) {
      if (this._endPoint.marker_id === marker.marker_id) {
        return true;
      }
    }
    if (!_.isEmpty(this._focusMarker)) {
      if (
        (this._focusMarker.marker_id === marker.marker_id &&
          this._filters.includes(this._focusMarker.marker_type)) ||
        (business && this._filters.includes(TRAIL_BUSINESSES)) ||
        (food && this._filters.includes(DRINKS_DINING))
      ) {
        return true;
      }
    }
    return false;
  }
}
