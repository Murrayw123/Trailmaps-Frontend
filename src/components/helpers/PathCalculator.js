import * as turf from '@turf/turf'
import { PathFinder } from './geojson-path-finder/index'
import nearestPointOnLine from './nearest-point-on-line'
import { element } from 'prop-types'

function findDistance(path) {
  let distance = 0
  let chartData = []

  let i
  if (path.length > 1) {
    for (i = 0; i < path.length; i++) {
      if (path[i - 1]) {
        distance += turf.distance(path[i - 1], path[i])
        chartData.push({ elevation: path[i][2], distance: distance })
      } else {
        distance = 0 + turf.distance(path[i], path[i + 1])
      }
    }
  }
  return { distance: distance, chartData: chartData }
}

export default function findPath(geoJsonPath, start, finish) {
  //combines FeatureCollection to MultiLineString
  let MultiLineString = turf.combine(geoJsonPath)
  //pull out the coordinates
  let line = MultiLineString.features[0].geometry.coordinates
  //turf convert to linestring
  let lineString = turf.multiLineString(line)
  //find the closest start point from mouse click to GEOJSON line
  let closestStart = nearestPointOnLine(
    lineString,
    turf.point([start.latlng.lng, start.latlng.lat])
  )
  //find the closest finish point from mouse click to GEOJSON line
  let closestFinish = nearestPointOnLine(
    lineString,
    turf.point([finish.latlng.lng, finish.latlng.lat])
  )

  //grab the actual coordinates I jammed into the index (uses a customised version of turf nearestPointOnLine)
  closestStart = turf.point(closestStart.properties.index)
  closestFinish = turf.point(closestFinish.properties.index)

  let pathFinder = new PathFinder(geoJsonPath, { precision: 1e-5 }) //exact match is five decimal places, only leaving this in here for reference
  let path = pathFinder.findPath(closestStart, closestFinish)
  let distance = findDistance(path.path)
  //returns a linestring so leaflet can use it as a geojson layer
  let linestring = turf.lineString(path.path)
  let returnPath = {
    path: linestring,
    distance: distance.distance,
    chartData: distance.chartData
  }
  return returnPath
}
