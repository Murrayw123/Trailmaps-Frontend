import { business_groupings, food_groupings } from "helpers/iconsData";
import { Marker } from "Interfaces/Marker";
import { Dispatch } from "redux";
import {
  changeSideBarData,
  changeZoomLevel,
  fetchDataSuccess,
} from "redux/actions";
import { MapData } from "objects/MapData";

export function processMarkerGroupings(markers: Array<Marker>): Array<string> {
  const mapMarkerTypes = [];
  markers.forEach((marker) => {
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
  return mapMarkerTypes;
}

export function startMap(dispatch: Dispatch, mapData: MapData): void {
  dispatch(changeZoomLevel(mapData.zoomLevel));
  dispatch(changeSideBarData(mapData.blurb, mapData.defaultImage));
  dispatch(fetchDataSuccess(mapData));
}
