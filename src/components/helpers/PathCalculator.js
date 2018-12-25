import distance from "@turf/distance";
import along from "@turf/along";
import {lineString, multiLineString, point} from "@turf/helpers";
import combine from "@turf/combine";
import {PathFinder} from "./geojson-path-finder/index";
import nearestPointOnLine from "./nearest-point-on-line";
import _ from "lodash";

export function findPointAlongLine(path, distance) {
  return along(path, distance);
}

function findDistance(path) {
  let customDistance = 0;
  let chartData = [];
  let elevationGain = 0;
  let elevationLoss = 0;
  let i;
  if (path.length > 1) {
    for (i = 0; i < path.length; i++) {
      if (path[i - 1]) {
        customDistance += distance(path[i - 1], path[i]);
        let absLossOrGain = 0;
        if (i > 0 && i % 11 === 0) {
          //sample every 11th point
          absLossOrGain = Math.abs(path[i][2] - path[i - 11][2]);
          if (absLossOrGain > 5) {
            //filter out the noise
            if (path[i - 11][2] < path[i][2]) {
              //if the previous point is lower than the current point, it's elevation gain, otherwise it's elevation loss
              elevationGain += absLossOrGain;
            } else {
              elevationLoss += absLossOrGain;
            }
          }
        }
        chartData.push({
          elevation: path[i][2],
          distance: customDistance,
          coords: [path[i][1], path[i][0]]
        });
      } else {
        customDistance = 0;
        chartData.push({
          elevation: path[i][2],
          distance: customDistance,
          coords: [path[i][1], path[i][0]]
        });
      }
    }
  }
  return {
    distance: customDistance,
    chartData: chartData,
    elevationGain: elevationGain,
    elevationLoss: elevationLoss
  };
}

export function isMarkersValid(geoJsonPath, start, finish) {
  let { closestStart, closestFinish } = closest(geoJsonPath, start, finish);
  let startDistance = distance(
    [
      closestStart.geometry.coordinates[1],
      closestStart.geometry.coordinates[0]
    ],
    [start.marker_lat, start.marker_lng]
  );
  let endDistance = distance(
    [
      closestFinish.geometry.coordinates[1],
      closestFinish.geometry.coordinates[0]
    ],
    [finish.marker_lat, finish.marker_lng]
  );
  return startDistance < 10 && endDistance < 10;
}

function closest(geoJsonPath, start, finish) {
  let MultiLineString = combine(geoJsonPath);
  //pull out the coordinates
  let line = MultiLineString.features[0].geometry.coordinates;
  //turf convert to linestring
  let lineString = multiLineString(line);
  //find the closest start point from mouse click to GEOJSON line
  let closestStart = nearestPointOnLine(
    lineString,
    point([start.marker_lng, start.marker_lat])
  );

  let closestFinish = nearestPointOnLine(
    lineString,
    point([finish.marker_lng, finish.marker_lat])
  );
  return { closestStart: closestStart, closestFinish: closestFinish };
}

export function findPath(geoJsonPath, start, finish) {
  let { closestStart, closestFinish } = closest(geoJsonPath, start, finish);
  //grab the actual coordinates I jammed into the index (uses a customised version of turf nearestPointOnLine)
  closestStart = point(closestStart.properties.index);
  closestFinish = point(closestFinish.properties.index);
  if (_.isEqual(closestStart, closestFinish)) {
    return {
      path: null,
      distance: 0,
      chartData: null,
      elevationGain: 0,
      elevationLoss: 0
    };
  }
  let pathFinder = new PathFinder(geoJsonPath, { precision: 1e-5 }); //exact match is five decimal places, only leaving this in here for reference
  let path = pathFinder.findPath(closestStart, closestFinish);
  let customDistance = findDistance(path.path);
  //returns a linestring so leaflet can use it as a geojson layer
  let linestring = lineString(path.path);
  let returnPath = {
    path: linestring,
    distance: customDistance.distance,
    chartData: customDistance.chartData,
    elevationGain: customDistance.elevationGain,
    elevationLoss: customDistance.elevationLoss
  };
  return returnPath;
}
