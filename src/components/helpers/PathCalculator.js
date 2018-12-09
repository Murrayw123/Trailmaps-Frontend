import * as turf from "@turf/turf";
import { PathFinder } from "./geojson-path-finder/index";
import nearestPointOnLine from "./nearest-point-on-line";
import { element } from "prop-types";
import _ from "lodash";

export function findPointAlongLine(path, distance) {
  return turf.along(path, distance);
}

function findDistance(path) {
  let distance = 0;
  let chartData = [];
  let elevationGain = 0;
  let elevationLoss = 0;
  let i;
  if (path.length > 1) {
    for (i = 0; i < path.length; i++) {
      if (path[i - 1]) {
        distance += turf.distance(path[i - 1], path[i]);
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
          distance: distance,
          coords: [path[i][1], path[i][0]]
        });
      } else {
        distance = 0;
        chartData.push({
          elevation: path[i][2],
          distance: distance,
          coords: [path[i][1], path[i][0]]
        });
      }
    }
  }
  return {
    distance: distance,
    chartData: chartData,
    elevationGain: elevationGain,
    elevationLoss: elevationLoss
  };
}

export function isMarkersValid(geoJsonPath, start, finish) {
  let { closestStart, closestFinish } = closest(geoJsonPath, start, finish);
  let startDistance = turf.distance(
    [
      closestStart.geometry.coordinates[1],
      closestStart.geometry.coordinates[0]
    ],
    [start.latlng.lat, start.latlng.lng]
  );
  let endDistance = turf.distance(
    [
      closestFinish.geometry.coordinates[1],
      closestFinish.geometry.coordinates[0]
    ],
    [finish.latlng.lat, finish.latlng.lng]
  );
  return startDistance < 10 && endDistance < 10;
}

function closest(geoJsonPath, start, finish) {
  let MultiLineString = turf.combine(geoJsonPath);
  //pull out the coordinates
  let line = MultiLineString.features[0].geometry.coordinates;
  //turf convert to linestring
  let lineString = turf.multiLineString(line);
  //find the closest start point from mouse click to GEOJSON line
  let closestStart = nearestPointOnLine(
    lineString,
    turf.point([start.latlng.lng, start.latlng.lat])
  );

  let closestFinish = nearestPointOnLine(
    lineString,
    turf.point([finish.latlng.lng, finish.latlng.lat])
  );
  return { closestStart: closestStart, closestFinish: closestFinish };
}

export function findPath(geoJsonPath, start, finish) {
  let { closestStart, closestFinish } = closest(geoJsonPath, start, finish);
  //grab the actual coordinates I jammed into the index (uses a customised version of turf nearestPointOnLine)
  closestStart = turf.point(closestStart.properties.index);
  closestFinish = turf.point(closestFinish.properties.index);
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
  let distance = findDistance(path.path);
  //returns a linestring so leaflet can use it as a geojson layer
  let linestring = turf.lineString(path.path);
  let returnPath = {
    path: linestring,
    distance: distance.distance,
    chartData: distance.chartData,
    elevationGain: distance.elevationGain,
    elevationLoss: distance.elevationLoss
  };
  return returnPath;
}
