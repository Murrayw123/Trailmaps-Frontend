import along from "@turf/along";
import { lineString, multiLineString, point } from "@turf/helpers";
import combine from "@turf/combine";
import _ from "lodash";
import PathFinder from "@murrayw123/geojsonpathfinderamended/index";
import { nearestPointOnLine } from "./closest-point";
import { DistanceElevationCalculator } from "./DistanceElevationCalculator";

export function findPointAlongLine(path, distance) {
  return along(path, distance);
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
    point([start.lng, start.lat])
  );

  let closestFinish = nearestPointOnLine(
    lineString,
    point([finish.lng, finish.lat])
  );

  return { closestStart: closestStart, closestFinish };
}

export function findPath(geoJsonPath, start, finish) {
  let { closestStart, closestFinish } = closest(geoJsonPath, start, finish);

  const closestStartWithoutElevation = [
    closestStart.properties.coords[0],
    closestStart.properties.coords[1],
  ];
  const closestEndWithoutElevation = [
    closestFinish.properties.coords[0],
    closestFinish.properties.coords[1],
  ];

  closestStart = point(closestStartWithoutElevation);
  closestFinish = point(closestEndWithoutElevation);

  if (_.isEqual(closestStart, closestFinish)) {
    return {
      path: null,
      distance: 0,
      chartData: null,
      elevationGain: 0,
      elevationLoss: 0,
    };
  }
  let pathFinder = new PathFinder(geoJsonPath, { precision: 1e-5 }); //exact match is five decimal places, only leaving this in here for reference
  let path = pathFinder.findPath(closestStart, closestFinish);
  if (!path) {
    return {
      path: null,
      distance: 0,
      chartData: null,
      elevationGain: 0,
      elevationLoss: 0,
    };
  }

  // add our actual destination to the path. Use the elevation from the previous point, it's probably good enough ;)
  path.path.push([finish.lng, finish.lat, path.path[path.path.length - 1][2]]);

  let customDistance = new DistanceElevationCalculator(
    path.path
  ).calculatePathAndElevation();
  //returns a linestring so leaflet can use it as a geojson layer
  let linestring = lineString(path.path);

  return {
    path: linestring,
    distance: customDistance.distance,
    chartData: customDistance.chartData,
    elevationGain: customDistance.elevationGain,
    elevationLoss: customDistance.elevationLoss,
  };
}
