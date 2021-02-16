import React, { ReactElement } from "react";
import PoiMarker from "components/PoiMarker";
import ContextMenu from "components/ContextMenuApp";
import { bicycle, finish, start, walking } from "helpers/iconsData";
import { Marker as IMarker } from "Interfaces/Marker";
import { OnClickCallback } from "Interfaces/Types";
import { GlobalState } from "Interfaces/GlobalState";
import { Marker, GeoJSON } from "react-leaflet";

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
  mapMarkerStart: any,
  draggableMarkerStart: OnClickCallback
): ReactElement => {
  return (
    <Marker
      key={mapMarkerStart.distance}
      position={[mapMarkerStart.marker_lat, mapMarkerStart.marker_lng]}
      icon={start}
      draggable={true}
      onDragEnd={draggableMarkerStart}
      className="map-marker-custom"
    />
  );
};

export const mapMarkerEnd = (
  mapMarkerEnd: any,
  draggableMarkerEnd: OnClickCallback
): ReactElement => {
  return (
    <Marker
      key={mapMarkerEnd.distance}
      position={[mapMarkerEnd.marker_lat, mapMarkerEnd.marker_lng]}
      icon={finish}
      draggable={true}
      onDragEnd={draggableMarkerEnd}
      className="map-marker-custom"
    />
  );
};

export const customDistanceMarkerComponent = (
  mapType: string,
  customDistanceMarker: unknown
): ReactElement => {
  //custom marker from elevation click hover
  return (
    <Marker
      key={1}
      position={customDistanceMarker}
      icon={mapType === "cycling" ? bicycle : walking}
    />
  );
};
