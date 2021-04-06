import { URLPREFIX } from "config";
import {
  changeElevationData,
  fetchDataBegin,
  fetchDataError,
  fetchElevationLoading,
  fetchMapsSuccess,
  fetchMarkerSuccess,
  fetchUsersFailure,
  fetchUsersSuccess,
  findTrailMarker,
  handleErrors,
} from "./actions";
import { Dispatch } from "redux";
import { processMarkerGroupings, startMap } from "redux/requests_helpers";
import { MapData } from "objects/MapData";

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

export function fetchInitialMapData(
  mapString: string
): (dispatch: Dispatch) => void {
  return async (dispatch) => {
    try {
      dispatch(fetchDataBegin());
      // fetch the map info
      const mapRes = await fetch(URLPREFIX + "/api/maps/" + mapString);
      const mapDataResource = await mapRes.json();
      // use that to fetch the json from aws
      const mapTrackRes = await fetch(mapDataResource.track);
      const mapTrack = await mapTrackRes.json();
      // create the object
      const mapData = new MapData(mapDataResource, mapTrack);
      return startMap(dispatch, mapData);
    } catch (e) {
      console.error(e, "MapInfo");
      return dispatch(fetchDataError(e));
    }
  };
}

export function fetchMarkers(mapString: string): (dispatch: Dispatch) => void {
  return async (dispatch) => {
    try {
      dispatch(fetchDataBegin());
      const result = await fetch(URLPREFIX + "/api/markers?alias=" + mapString);
      const markers = await result.json();
      const mapMarkerTypes = processMarkerGroupings(markers);
      dispatch(findTrailMarker(mapMarkerTypes));
      dispatch(fetchMarkerSuccess(markers));
    } catch (e) {
      console.error(e, "Markers");
      dispatch(fetchDataError(e));
    }
  };
}

export function postNewMarker(formData: unknown): Promise<boolean> {
  const settings = {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  return fetch(URLPREFIX + "/api/submit_marker", settings).then((response) => {
    return response.status === 201;
  });
}

export function fetchOtherMaps() {
  return (dispatch: Dispatch) => {
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
    fetch(URLPREFIX + "/api/spot_users_with_location?alias=" + mapString)
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
                id: trail_user.id,
                type: trail_user.user_type,
                lat: trail_user.locations[0].latitude,
                lng: trail_user.locations[0].longitude,
                default_image: trail_user.user_picture,
                blurb: trail_user.user_blurb,
                info: [
                  {
                    title: "Latest GPS Location Timestamp",
                    value: date.toString(),
                  },
                ],
                title: trail_user.user_name,
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
        dispatch(fetchUsersFailure(error));
      });
  };
}
