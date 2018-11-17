import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  addMapMarkerStart,
  addMapMarkerEnd,
  storeDistance,
  storeElevation,
  storeCustomTrack
} from '../redux/actions'
import { findPath } from './helpers/PathCalculator'
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  GeoJSON,
  Polyline
} from 'react-leaflet'
import { start, finish, bicycle } from './helpers/iconsData'
import PoiMarker from './PoiMarker'

class MapComponent extends Component {
  state = { markerCounter: 0 }

  checkMarkers = e => {
    if (this.state.markerCounter < 2) {
      this.setState({ markerCounter: this.state.markerCounter + 1 })
      this.addMarker(e)
    }
  }

  addMarker = e => {
    if (this.state.markerCounter === 1) {
      e.startEnd = 'START'
      this.props.storeDistance(e)
      this.props.addMapMarkerStart(e)
    } else {
      e.startEnd = 'END'
      this.props.storeDistance(e)
      this.props.addMapMarkerEnd(e)
      this.calculateInfo()
      // this.setState({ markerCounter: 0 })
      // this.props.storePath(null)
    }
  }

  calculateInfo() {
    //deals with custom route finding
    let pathAndDistance = findPath(
      this.props.data.map_track,
      this.props.customDistance[0],
      this.props.customDistance[1]
    )
    this.props.storePath(pathAndDistance)
  }

  checkForCustomPath = () => {
    //if there is a custom route to display, display it
    if (Object.keys(this.props.customPath).length) {
      return (
        <GeoJSON
          key={this.props.customPath.elevationChartData.length}
          data={this.props.customPath.path}
          interactive={false}
          color="red"
        />
      )
    }
  }

  shouldShowMarker = marker => {
    let startPoint = this.props.startPoint
    let endPoint = this.props.endPoint
    let focusMarker = this.props.focusMarker
    if (!_.isEmpty(startPoint)) {
      if (startPoint.marker_id === marker.marker_id) {
        return true
      }
    }
    if (!_.isEmpty(endPoint)) {
      if (endPoint.marker_id === marker.marker_id) {
        return true
      }
    }
    if (!_.isEmpty(focusMarker)) {
      if (focusMarker.marker_id === marker.marker_id) {
        return true
      }
    }
    return false
  }

  filterMarkers = () => {
    //if the marker is in the filtered list
    let validMarkers = []
    this.props.poiMarkers.map(marker => {
      if (
        this.props.filters.includes(marker.marker_type) ||
        this.shouldShowMarker(marker)
      ) {
        validMarkers.push(<PoiMarker marker={marker} />)
      }
    })
    return validMarkers
  }

  markerDragEnd = e => {
    e.latlng = { lat: e.target._latlng.lat, lng: e.target._latlng.lng }
    if (e.startEnd === 'start') {
      this.props.addMapMarkerStart(e)
    } else {
      this.props.addMapMarkerEnd(e)
    }
    let pathAndDistance = findPath(
      this.props.data.map_track,
      this.props.mapMarkerStart,
      this.props.mapMarkerEnd
    )
    this.props.storePath(pathAndDistance)
  }

  render() {
    const {
      data,
      customPath,
      center,
      zoom,
      terrain,
      customDistanceMarker,
      mapMarkerStart,
      mapMarkerEnd
    } = this.props
    let terrainURL =
      'https://maps.tilehosting.com/styles/' +
      terrain +
      '/{z}/{x}/{y}.png?key=7qrAZ6R0EFPZMiyEp2m4'
    return (
      <Map
        center={center}
        zoom={zoom}
        className="map"
        zoomControl={false}
        onClick={this.checkMarkers}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='<a href="https://www.maptiler.com/license/maps/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
          url={terrainURL}
        />
        <GeoJSON interactive={false} data={data.map_track} />

        {this.checkForCustomPath()}
        {this.filterMarkers().map(marker => {
          return marker
        })}

        {mapMarkerStart ? (
          //custom markers from click event
          <Marker
            key={mapMarkerStart.distance}
            position={[mapMarkerStart.latlng.lat, mapMarkerStart.latlng.lng]}
            icon={start}
            draggable={true}
            onDragEnd={e => {
              e.startEnd = 'start'
              return this.markerDragEnd(e)
            }}
            className="map-marker-custom"
          />
        ) : null}

        {mapMarkerEnd ? (
          //custom markers from click event
          <Marker
            key={mapMarkerEnd.distance}
            position={[mapMarkerEnd.latlng.lat, mapMarkerEnd.latlng.lng]}
            icon={finish}
            draggable={true}
            onDragEnd={e => {
              e.startEnd = 'end'
              return this.markerDragEnd(e)
            }}
            className="map-marker-custom"
          />
        ) : null}

        {customDistanceMarker.length ? (
          //custom marker from elevation click hover
          <Marker key={1} position={customDistanceMarker} icon={bicycle} />
        ) : null}
      </Map>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addMapMarkerStart: e => {
    dispatch(addMapMarkerStart(e))
  },
  addMapMarkerEnd: e => {
    dispatch(addMapMarkerEnd(e))
  },
  storeDistance: distance => {
    dispatch(storeDistance(distance))
  },
  calcElevation: elevation => {
    dispatch(storeElevation(elevation))
  },
  storePath: path => {
    dispatch(storeCustomTrack(path))
  }
})

const mapStateToProps = state => ({
  data: state.data,
  poiMarkers: state.poiMarkers,
  customDistance: state.customDistance,
  customPath: state.customPath,
  center: state.center,
  zoom: state.zoom,
  filters: state.filters,
  terrain: state.terrain,
  startPoint: state.startPoint,
  endPoint: state.endPoint,
  focusMarker: state.focusMarker,
  customDistanceMarker: state.customDistanceMarker,
  mapMarkerStart: state.mapMarkerStart,
  mapMarkerEnd: state.mapMarkerEnd
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponent)
