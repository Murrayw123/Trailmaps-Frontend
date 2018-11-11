import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  addMapMarker,
  storeDistance,
  storeElevation,
  storeCustomTrack
} from '../redux/actions'
import findPath from './helpers/PathCalculator'
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  GeoJSON,
  Polyline
} from 'react-leaflet'
import { start, finish } from './helpers/iconsData'
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
      this.props.createMarker(e)
    } else {
      e.startEnd = 'END'
      this.props.storeDistance(e)
      this.props.createMarker(e)
      this.calculateInfo()
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
    if (Object.keys(this.props.customPath).length !== 0) {
      return <GeoJSON data={this.props.customPath.path} color="red" />
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

  render() {
    const { data, mapMarkers, customPath, center, zoom, terrain } = this.props
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

        {mapMarkers.map((marker, counter) => {
          //custom markers from click event
          return (
            <Marker
              key={marker.id}
              position={[marker.latlng.lat, marker.latlng.lng]}
              icon={counter === 0 ? start : finish}
            />
          )
        })}
      </Map>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createMarker: e => {
    dispatch(addMapMarker(e))
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
  mapMarkers: state.mapMarkers,
  poiMarkers: state.poiMarkers,
  customDistance: state.customDistance,
  customPath: state.customPath,
  center: state.center,
  zoom: state.zoom,
  filters: state.filters,
  terrain: state.terrain,
  startPoint: state.startPoint,
  endPoint: state.endPoint,
  focusMarker: state.focusMarker
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponent)
