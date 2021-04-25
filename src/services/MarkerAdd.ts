import { Store } from "redux";
import _ from "lodash";
import {
  addMapMarkerEnd,
  addMapMarkerStart,
  changeSideBarData,
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
import { Marker } from "Interfaces/Marker";
import { GlobalStateStore } from "redux/reducers";
import { GlobalState } from "Interfaces/GlobalState";
import { fetchElevation } from "redux/requests";

const BUTTON = "button";
const CUSTOM_MAP_POINT = "Custom Map Point";
export const START = "start";
export const FINISH = "end";
const DISTANCE_TAB = "distanceTab";

const TRAIL_BUSINESSES = "trail businesses";
const DRINKS_DINING = "drinks & dining";

export class MarkerAddService {
  private _store: GlobalStateStore;
  private _allowCustomPath: boolean;
  private _startPoint: GlobalState["startPoint"];
  private _endPoint: GlobalState["endPoint"];
  private _poiMarkers: GlobalState["poiMarkers"];
  private _openKeys: GlobalState["openKeys"];
  private _mapData: GlobalState["mapData"];
  private _focusMarker: GlobalState["focusMarker"];
  private _filters: GlobalState["filters"];
  private _shouldShowContextMenuStatus: GlobalState["shouldShowContextMenuStatus"];

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
      this._mapData = state.mapData;
    });
  }

  public checkMarkers(e: any): void {
    if (this._shouldShowContextMenuStatus) {
      return;
    }
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
        e.startEnd = FINISH;
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
      title: CUSTOM_MAP_POINT,
      lat: e.latlng.lat,
      lng: e.latlng.lng,
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

  public draggableMarker(dragEvent: any, startOrEnd: string): void {
    const startPointCheckEmpty = _.isEmpty(this._startPoint);
    const endPointCheckEmpty = _.isEmpty(this._endPoint);

    const updatedMarker = {
      title: CUSTOM_MAP_POINT,
      lat: dragEvent.target._lngLat.lat,
      lng: dragEvent.target._lngLat.lng,
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
      this._mapData.track,
      this._startPoint,
      this._endPoint
    );
    this._store.dispatch(storeCustomTrack(pathAndDistance));
  }

  public onMapRightClick(event: mapboxgl.MapMouseEvent): void {
    this._store.dispatch(
      setLatLngFromContextClick({
        lat: event.lngLat.lat,
        lng: event.lngLat.lng,
      })
    );

    this._store.dispatch<any>(
      fetchElevation(event.lngLat.lat, event.lngLat.lng)
    );

    this._store.dispatch(shouldShowContextMenu(true));
  }

  public onMarkerClick(marker: any): void {
    this._store.dispatch(storeFocusMarker(marker));
    this._store.dispatch(
      changeSideBarData(marker.blurb, marker.default_image)
    );
  }

  public get markersInFilteredList(): Array<Marker> {
    return this._poiMarkers.filter((marker) => this._shouldShowMarker(marker));
  }

  private _shouldShowMarker(marker: Marker): boolean {
    const business = business_groupings.includes(marker.type);
    const food = food_groupings.includes(marker.type);

    if (
      this._filters.includes(marker.type) ||
      (business && this._filters.includes(TRAIL_BUSINESSES)) ||
      (food && this._filters.includes(DRINKS_DINING))
    ) {
      return true;
    }

    if (!_.isEmpty(this._startPoint)) {
      if (this._startPoint.id === marker.id) {
        return true;
      }
    }
    if (!_.isEmpty(this._endPoint)) {
      if (this._endPoint.id === marker.id) {
        return true;
      }
    }
    if (!_.isEmpty(this._focusMarker)) {
      if (
        (this._focusMarker.id === marker.id &&
          this._filters.includes(this._focusMarker.type)) ||
        (business && this._filters.includes(TRAIL_BUSINESSES)) ||
        (food && this._filters.includes(DRINKS_DINING))
      ) {
        return true;
      }
    }
    return false;
  }
}
