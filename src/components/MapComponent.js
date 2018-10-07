import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  addMapMarker,
  storeDistance,
  storeElevation,
  storeCustomTrack
} from '../redux/actions'
import findPath from './helpers/PathCalculator'
import findIcon from './helpers/iconsData'

import {
  Map,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  GeoJSON,
  Polyline
} from 'react-leaflet'
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
      return <GeoJSON data={this.props.customPath.path.path} color="red" />
    }
  }

  buildPOIMarker = marker => {
    let icon = findIcon(marker.marker_type)
    let info = Object.entries(marker.marker_info)
    return (
      <Marker
        key={marker.id}
        position={[marker.marker_lat, marker.marker_lng]}
        icon={icon}
      >
        <Popup>
          {info.map(el => {
            return (
              <div>
                <b> {el[0]}: </b> {el[1]}
              </div>
            )
          })}
        </Popup>
      </Marker>
    )
  }

  render() {
    const { data, mapMarkers, poiMarkers, customPath } = this.props
    const position = [data.startpointlat, data.startpointlng]
    return (
      <Map
        center={position}
        zoom={13}
        className="map"
        zoomControl={false}
        onClick={this.checkMarkers}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON interactive={false} data={data.map_track} />

        {this.checkForCustomPath()}

        {poiMarkers.map(marker => {
          // point of interest markers
          return this.buildPOIMarker(marker)
        })}

        {mapMarkers.map(marker => {
          //custom markers from click event
          return (
            <Marker
              key={marker.id}
              position={[marker.latlng.lat, marker.latlng.lng]}
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
  customPath: state.customPath
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponent)
