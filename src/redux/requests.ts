import { URLPREFIX } from "config";
import * as _ from "lodash";
import { business_groupings, food_groupings } from "helpers/iconsData";
import {
  changeElevationData,
  changeSideBarData,
  changeZoomLevel,
  fetchDataBegin,
  fetchDataError,
  fetchDataSuccess,
  fetchElevationLoading,
  fetchMapsSuccess,
  fetchMarkerSuccess,
  fetchUsersSuccess,
  findTrailMarker,
  handleErrors,
} from "./actions";
import { Dispatch } from "redux";

export function fetchElevation(
  lat: number,
  lng: number
): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch(fetchElevationLoading(true));
    fetch(
      `https://dev.virtualearth.net/REST/v1/Elevation/List?points=${lat},${lng}&key=Ahj6mcvlG04XGZyebUbWKYsWBAXBF18DeXctHOmwCrcxj-C4TvQKGCBmPVfnq0Z2`
    )
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        const elevationData = json.resourceSets[0].resources[0].elevations[0];
        dispatch(changeElevationData(elevationData));
        dispatch(fetchElevationLoading(false));
      })
      .catch((error) => {
        console.error(error, "Get elevations error");
      });
  };
}

export function fetchData(mapString: string): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch(fetchDataBegin());
    fetch(URLPREFIX + "/api/maps/" + mapString)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        const clonedJson = _.cloneDeep(json);
        const filters = [];
        clonedJson.default_filters.forEach((filter) =>
          filters.push(filter.type)
        );
        clonedJson.filters = filters;
        dispatch(changeZoomLevel(clonedJson.zoom_level));
        dispatch(
          changeSideBarData(clonedJson.map_blurb, clonedJson.default_image)
        );
        dispatch(fetchDataSuccess(clonedJson));
        return clonedJson;
      })
      .catch((error) => {
        console.error(error, "MapInfo");
        dispatch(fetchDataError(error));
      });
  };
}

export function fetchMarkers(mapString: string): (dispatch: Dispatch) => void {
  return (dispatch) => {
    dispatch(fetchDataBegin());
    fetch(URLPREFIX + "/api/markers?map_alias=" + mapString)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        return json.map((el) => {
          return {
            marker_id: el.id,
            marker_type: el.marker_type,
            marker_lat: el.marker_lat,
            marker_lng: el.marker_lng,
            marker_info: el.marker_info,
            marker_title: el.marker_title,
            marker_blurb: el.marker_blurb,
            default_image: el.default_image,
          };
        });
      })
      .then((data) => {
        const mapMarkerTypes = [];
        data.forEach((marker) => {
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
            console.log(marker.marker_type);
            mapMarkerTypes.push(marker.marker_type);
          }
        });
        dispatch(findTrailMarker(mapMarkerTypes));
        dispatch(fetchMarkerSuccess(data));
      })
      .catch((error) => {
        console.error(error, "Markers");
        dispatch(fetchDataError(error));
      });
  };
}

export function fetchOtherMaps() {
  return (dispatch) => {
    dispatch(fetchDataBegin());
    fetch(URLPREFIX + "/api/map_preview")
      .then(handleErrors)
      .then((res) => res.json())
      .then((data) => {
        dispatch(fetchMapsSuccess(data));
      })
      .catch((error) => {
        console.error(error, "Many Maps Info");
        dispatch(fetchDataError(error));
      });
  };
}

export function fetchTrailUsers(mapString) {
  return (dispatch) => {
    dispatch(fetchDataBegin());
    fetch(URLPREFIX + "/api/spotuserswithlocation?map_alias=" + mapString)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        const data = [];
        json.map((trail_user) => {
          if (trail_user.locations[0]) {
            const difference =
              Date.now() -
              Date.parse(trail_user.locations[0].recorded_timestamp);
            if (difference < 86400000 * 3 || true) {
              //less than 3 days
              const datestr = trail_user.locations[0].recorded_timestamp.split(
                /[-T.]/
              );
              const safdat = new Date(
                datestr.slice(0, 3).join("/") + " " + datestr[3]
              );
              const date = new Date(
                safdat
                // Date.parse(trail_user.locations[0].recorded_timestamp)
              );
              data.push({
                marker_id: trail_user.id,
                marker_type: trail_user.user_type,
                marker_lat: trail_user.locations[0].latitude,
                marker_lng: trail_user.locations[0].longitude,
                default_image: trail_user.user_picture,
                marker_blurb: trail_user.user_blurb,
                marker_info: [
                  {
                    title: "Latest GPS Location Timestamp",
                    value: date.toString(),
                  },
                ],
                marker_title: trail_user.user_name,
                gps_locations: trail_user.locations,
              });
            }
          }
        });
        return data;
      })
      .then((data) => {
        dispatch(fetchUsersSuccess(data));
      })
      .catch((error) => {
        console.error(error, "Trail Users");
        dispatch(fetchDataError(error));
      });
  };
}
