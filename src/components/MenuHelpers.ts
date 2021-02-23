import {
  changeFocusPoint,
  changeZoomLevel,
  setEndPoint,
  setStartPoint,
  storeFocusMarker,
  wipeEndMarker,
  wipeStartMarker,
} from "redux/actions";
import { Dispatch } from "redux";
import { Marker } from "Interfaces/Marker";

const DISTANCE = "distance";
const LIVETRAILUSER = "liveTrailUser";
const LOCATE = "locate";
const START = "start";
const FINISH = "end";

export const selectMarker = (
  type: string,
  dispatch: Dispatch,
  focusedMarker: Marker
): void => {
  if (type === LOCATE) {
    dispatch(changeZoomLevel(13));
    dispatch(
      changeFocusPoint([focusedMarker.marker_lat, focusedMarker.marker_lng])
    );
    dispatch(storeFocusMarker(focusedMarker));
  }
  if (type === START) {
    dispatch(wipeStartMarker());
    dispatch(setStartPoint(focusedMarker));
  }
  if (type === FINISH) {
    dispatch(wipeEndMarker());
    dispatch(setEndPoint(focusedMarker));
  }
};

export const findMarker = (
  markerType: string,
  poiMarkers: Array<Marker>,
  markerId: string,
  liveTrailUsers: Array<Marker>
): Marker => {
  let focusedMarker;
  if (markerType === DISTANCE) {
    focusedMarker = poiMarkers.find((el) => {
      return el.id === parseInt(markerId);
    });
  }
  if (markerType === LIVETRAILUSER) {
    focusedMarker = liveTrailUsers.find((el) => {
      return el.id === parseInt(markerId);
    });
  }
  return focusedMarker;
};
