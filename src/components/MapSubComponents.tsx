import React, { ReactElement } from "react";
import PoiMarker from "components/PoiMarker";
import ContextMenu from "components/ContextMenuApp";
import { CustomMapPoint, Marker, Marker as IMarker } from "Interfaces/Marker";
import { OnClickCallback } from "Interfaces/Types";
import { GlobalState } from "Interfaces/GlobalState";
import { MapboxMarker } from "components/MapboxComponents/MapboxMarker";
import { findIcon } from "helpers/iconsData";
import { MapboxGeoJSON } from "components/MapboxComponents/MapboxGeoJSON";

const start = findIcon("start");
const finish = findIcon("finish");
const bicycle = findIcon("bicycle");
const walking = findIcon("walking");

export const generateCustomPath = (
  customPath: GlobalState["customPath"]
): ReactElement => {
  return <MapboxGeoJSON path={customPath?.path} color={"red"} />;
};

export const poiMarkers = (
  markersInFilteredList: Array<IMarker>,
  onClick: OnClickCallback
): Array<ReactElement> => {
  return markersInFilteredList.map((marker, count) => {
    return <PoiMarker key={count} marker={marker} onClick={onClick} />;
  });
};

export const liveTrailUsers = (
  liveTrailUsers: Array<IMarker>,
  onClick: OnClickCallback
): Array<ReactElement> => {
  return liveTrailUsers.map((trailUser, count) => {
    return <PoiMarker key={count} marker={trailUser} onClick={onClick} />;
  });
};

export const contextMenuStatus = (
  rightClickXCoord: number,
  rightClickYCoord: number
): ReactElement => {
  return <ContextMenu x={rightClickXCoord} y={rightClickYCoord} />;
};

export const mapMarkerStart = (
  mapMarkerStart: CustomMapPoint,
  draggableMarkerCallback: OnClickCallback
): ReactElement => {
  return (
    <MapboxMarker
      marker={mapMarkerStart}
      key={mapMarkerStart.distance}
      position={[mapMarkerStart.lng, mapMarkerStart.lat]}
      icon={start}
      hasPopup={false}
      draggable={true}
      onDragStart={draggableMarkerCallback}
      onDragEnd={draggableMarkerCallback}
      className="map-marker-custom"
      onClick={() => null}
    />
  );
};

export const mapMarkerFinish = (
  mapMarkerFinish: CustomMapPoint,
  draggableMarkerCallback: OnClickCallback
): ReactElement => {
  return (
    <MapboxMarker
      marker={mapMarkerFinish}
      key={mapMarkerFinish.distance}
      position={[mapMarkerFinish.lng, mapMarkerFinish.lat]}
      icon={finish}
      draggable={true}
      hasPopup={false}
      onDragStart={draggableMarkerCallback}
      onDragEnd={draggableMarkerCallback}
      className="map-marker-custom"
      onClick={() => null}
    />
  );
};

export const customDistanceMarkerComponent = (
  mapType: string,
  customDistanceMarker: CustomMapPoint
): ReactElement => {
  //custom marker from elevation click hover
  return (
    <MapboxMarker
      marker={customDistanceMarker as Marker}
      key={1}
      position={[
        customDistanceMarker.lng,
        customDistanceMarker.lat,
      ]}
      hasPopup={false}
      icon={mapType === "cycling" ? bicycle : walking}
      onClick={() => null}
    />
  );
};
