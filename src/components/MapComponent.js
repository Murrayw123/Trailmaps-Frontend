import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMapMarker, storeDistance, storeElevation } from '../redux/actions'
import findPath from './helpers/PathCalculator'

import {
  Map,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  GeoJSON
} from 'react-leaflet'
class MapComponent extends Component {
  state = { markerCounter: 0 }

  checkMarkers = e => {
    if (this.state.markerCounter < 2) {
      console.log(this.state.markerCounter)
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
    let distance = findPath(
      this.props.data.track,
      this.props.customDistance[0],
      this.props.customDistance[1]
    )
    let elevation
    this.props.storeDistance(distance)
    this.props.calcElevation(elevation)
  }

  render() {
    const { data, mapMarkers } = this.props
    const position = [data.startpoint.lat, data.startpoint.lng]
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
          url="http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
        />
        <GeoJSON interactive={false} data={data.track} />
        {data.markers.map(marker => {
          return (
            <Marker
              key={marker.id}
              position={[marker.coords.lat, marker.coords.lng]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )
        })}
        {mapMarkers.map(marker => {
          return (
            <Marker
              key={marker.id}
              position={[marker.latlng.lat, marker.latlng.lng]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
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
  }
})

const mapStateToProps = state => ({
  data: state.data,
  mapMarkers: state.mapMarkers,
  customDistance: state.customDistance
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponent)
