import React, { Component } from 'react'
import * as turf from '@turf/turf'
var PathFinder = require('geojson-path-finder')

function findDistance(path) {
  let distance = 0
  let i
  if (path.length > 1) {
    for (i = 0; i < path.length; i++) {
      if (path[i + 1]) {
        distance += turf.Distance(path[i], path[i + 1])
      }
    }
  }
  return distance
}

export default function findPath(geoJsonPath, start, finish) {
  //combines FeatureCollection to MultiLineString
  let MultiLineString = turf.combine(geoJsonPath)
  //pull out the coordinates
  let line = MultiLineString.features[0].geometry.coordinates
  //turf convert to linestring
  let lineString = turf.multiLineString(line)
  //find the closest start point from mouse click to GEOJSON line
  let closestStart = turf.nearestPointOnLine(lineString, [
    start.latlng.lat,
    start.latlng.lng
  ])
  //find the closest finish point from mouse click to GEOJSON line
  let closestFinish = turf.nearestPointOnLine(lineString, [
    finish.latlng.lat,
    finish.latlng.lng
  ])
  closestStart.geometry.coordinates = closestStart.properties.lineCoord
  closestFinish.geometry.coordinates = closestFinish.properties.lineCoord

  let pathFinder = new PathFinder(geoJsonPath)
  // let path = pathFinder.findPath(closestStart, closestFinish)
  // let distance = this.findDistance(path.path)
  // let returnPath = { path: path.path, distance: distance }
  // return returnPath
}
