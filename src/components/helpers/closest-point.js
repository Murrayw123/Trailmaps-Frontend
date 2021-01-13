import { isObject, lineString, point } from "@turf/helpers";
import { flattenEach } from "@turf/meta";
import { getCoords } from "@turf/invariant";
import bearing from "@turf/bearing";
import destination from "@turf/destination";
import distance from "@turf/distance";

import lineIntersects from "@turf/line-intersect";

export function nearestPointOnLine(lines, pt, options) {
  // Optional parameters
  options = options || {};
  if (!isObject(options)) throw new Error("options is invalid");

  // validation
  var type = lines.geometry ? lines.geometry.type : lines.type;
  if (type !== "LineString" && type !== "MultiLineString") {
    throw new Error("lines must be LineString or MultiLineString");
  }

  var closestPt = point([Infinity, Infinity], {
    dist: Infinity,
  });

  var length = 0.0;
  flattenEach(lines, function (line) {
    var coords = getCoords(line);

    for (var i = 0; i < coords.length - 1; i++) {
      //start
      var start = point(coords[i]);
      start.properties.dist = distance(pt, start, options);
      //stop
      var stop = point(coords[i + 1]);
      stop.properties.dist = distance(pt, stop, options);
      // sectionLength
      var sectionLength = distance(start, stop, options);
      //perpendicular
      var heightDistance = Math.max(
        start.properties.dist,
        stop.properties.dist
      );
      var direction = bearing(start, stop);
      var perpendicularPt1 = destination(
        pt,
        heightDistance,
        direction + 90,
        options
      );
      var perpendicularPt2 = destination(
        pt,
        heightDistance,
        direction - 90,
        options
      );
      var intersect = lineIntersects(
        lineString([
          perpendicularPt1.geometry.coordinates,
          perpendicularPt2.geometry.coordinates,
        ]),
        lineString([start.geometry.coordinates, stop.geometry.coordinates])
      );
      var intersectPt = null;
      if (intersect.features.length > 0) {
        intersectPt = intersect.features[0];
        intersectPt.properties.dist = distance(pt, intersectPt, options);
        intersectPt.properties.location =
          length + distance(start, intersectPt, options);
      }

      if (start.properties.dist < closestPt.properties.dist) {
        closestPt = start;
        closestPt.properties.coords = coords[i];
      }
      if (stop.properties.dist < closestPt.properties.dist) {
        closestPt = stop;
        closestPt.properties.coords = coords[i];
      }
      if (
        intersectPt &&
        intersectPt.properties.dist < closestPt.properties.dist
      ) {
        closestPt = intersectPt;
        closestPt.properties.coords = coords[i];
      }
      // update length
      length += sectionLength;
    }
  });
  return closestPt;
}
