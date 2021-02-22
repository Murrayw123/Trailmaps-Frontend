import React, { ReactElement } from "react";
import PoiMarker from "components/PoiMarker";
import ContextMenu from "components/ContextMenuApp";
import { CustomMapPoint, Marker as IMarker } from "Interfaces/Marker";
import { OnClickCallback } from "Interfaces/Types";
import { GlobalState } from "Interfaces/GlobalState";
import { MapboxMarker } from "components/MapboxComponents/Marker";
import { findIcon } from "helpers/iconsData";

const start = findIcon("start");
const finish = findIcon("finish");
const bicycle = findIcon("bicycle");
const walking = findIcon("walking");

export const customPath = (
  customPath: GlobalState["customPath"]
): ReactElement => {
  return null;
  // return (
  //   <GeoJSONLayer
  //     data={customPath.path}
  //     linePaint={{
  //       "line-width": 3,
  //       "line-color": "red",
  //     }}
  //     sourceOptions={{
  //       type: "geojson",
  //     }}
  //   />
  // );
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
  draggableMarkerStart: OnClickCallback
): ReactElement => {
  return (
    <MapboxMarker
      marker={mapMarkerStart}
      key={mapMarkerStart.distance}
      position={[mapMarkerStart.marker_lng, mapMarkerStart.marker_lat]}
      icon={start}
      hasPopup={false}
      draggable={true}
      onDragStart={draggableMarkerStart}
      className="map-marker-custom"
    />
  );
};

export const mapMarkerEnd = (
  mapMarkerEnd: CustomMapPoint,
  draggableMarkerEnd: OnClickCallback
): ReactElement => {
  return (
    <MapboxMarker
      marker={mapMarkerEnd}
      key={mapMarkerEnd.distance}
      position={[mapMarkerEnd.marker_lng, mapMarkerEnd.marker_lat]}
      icon={finish}
      draggable={true}
      hasPopup={false}
      onDragEnd={draggableMarkerEnd}
      className="map-marker-custom"
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
      marker={customDistanceMarker}
      key={1}
      position={[
        customDistanceMarker.marker_lng,
        customDistanceMarker.marker_lat,
      ]}
      hasPopup={false}
      icon={mapType === "cycling" ? bicycle : walking}
    />
  );
};
