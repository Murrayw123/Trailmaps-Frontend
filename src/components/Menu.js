import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  filterTrailMarkers,
  storeCustomTrack,
  changeTerrain,
  wipeMarkers,
  wipeMarkersAndPath
} from '../redux/actions'
import { Menu, Icon, Divider, Card } from 'antd'
import _ from 'lodash'
import DistanceCalculator from './DistanceCalculator'
import DistanceCalculatorForm from './DistanceCalculatorForm'
import FilterMarkers from './Markers'
import CustomJourney from './CustomJourney'
import { TerrainSwitch } from './TerrainSwitch'
import { findPath } from './helpers/PathCalculator'
import {
  changeZoomLevel,
  changeFocusPoint,
  setStartPoint,
  setEndPoint,
  storeFocusMarker
} from '../redux/actions'

const SubMenu = Menu.SubMenu

class Sider extends React.Component {
  dataSelect = (markerid, type) => {
    let newFocus = this.props.poiMarkers.find(el => {
      return el.marker_id === parseInt(markerid)
    })
    if (type === 'locate') {
      this.props.dispatch(changeZoomLevel(13))
      this.props.dispatch(
        changeFocusPoint([newFocus.marker_lat, newFocus.marker_lng])
      )
      this.props.dispatch(storeFocusMarker(newFocus))
    } else if (type === 'start') {
      this.props.dispatch(setStartPoint(newFocus))
    } else {
      this.props.dispatch(setEndPoint(newFocus))
    }
  }

  submitDistance = e => {
    e.preventDefault()
    this.props.dispatch(wipeMarkers())
    let pathAndDistance = this.calculateInfo()
    this.props.dispatch(storeCustomTrack(pathAndDistance))
  }

  clearPath = e => {
    e.preventDefault()
    this.props.dispatch(wipeMarkersAndPath())
  }

  calculateInfo = () => {
    //deals with custom route finding
    let pathObj = [
      {
        latlng: {
          lat: this.props.startPoint.marker_lat,
          lng: this.props.startPoint.marker_lng
        }
      },
      {
        latlng: {
          lat: this.props.endPoint.marker_lat,
          lng: this.props.endPoint.marker_lng
        }
      }
    ]
    let pathAndDistance = findPath(
      this.props.data.map_track,
      pathObj[0],
      pathObj[1]
    )
    return pathAndDistance
  }

  filterMarkers = markers => {
    this.props.dispatch(filterTrailMarkers(markers))
  }

  terrainSwitch = value => {
    this.props.dispatch(changeTerrain(value))
  }

  isButtonDisabled = () => {
    let startEmpty = _.isEmpty(this.props.startPoint)
    let endEmpty = _.isEmpty(this.props.endPoint)
    if (startEmpty || endEmpty) {
      return true
    } else {
      return false
    }
  }

  render() {
    const {
      data,
      poiMarkers,
      mapMarkerTypes,
      customPath,
      terrain,
      focusMarker,
      filters
    } = this.props
    return (
      <Menu
        className="overlayMenu"
        onClick={this.handleClick}
        style={{ width: 300 }}
        defaultOpenKeys={['menu']}
        mode="inline"
      >
        <SubMenu
          key="menu"
          className="title"
          title={
            <span>
              <Icon
                style={{ fontSize: '1.4em' }}
                type="setting"
                theme="outlined"
                className="icons-large"
              />
              <span id="map-tool-heading">{data.name} Map Tools</span>
            </span>
          }
        >
          <Divider style={{ margin: 0 }} />
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="search" theme="outlined" className="sub-icon" />
                <span className="sub-heading">Locate Point on Map</span>
              </span>
            }
          >
            <div style={{ marginLeft: 24 }}>
              <DistanceCalculator
                placeHolder={'Point on map'}
                dataSource={poiMarkers}
                type={'locate'}
                onSelect={this.dataSelect}
                value={focusMarker}
              />
            </div>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="calculator" theme="outlined" className="sub-icon" />
                <span className="sub-heading">Distance Calculator</span>
              </span>
            }
          >
            <DistanceCalculatorForm
              dataSource={poiMarkers}
              dataSelect={this.dataSelect}
              buttonDisabled={this.isButtonDisabled()}
              submitDistance={this.submitDistance}
              clearPath={this.clearPath}
            />
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="select" theme="outlined" className="sub-icon" />
                <span className="sub-heading"> Filter Markers</span>
              </span>
            }
          >
            <FilterMarkers
              mapMarkerTypes={mapMarkerTypes}
              filterMarkers={this.filterMarkers}
              currentFilters={filters}
              style={{ marginLeft: 24, width: 200 }}
            />
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="picture" theme="outlined" className="sub-icon" />
                <span className="sub-heading">Change Map Terrain</span>
              </span>
            }
          >
            <TerrainSwitch
              terrain={terrain}
              terrainSwitch={this.terrainSwitch}
            />
          </SubMenu>
          <SubMenu
            key="sub5"
            title={
              <span>
                <Icon type="edit" theme="outlined" className="sub-icon" />
                <span className="sub-heading">
                  Custom Journey / Interactivity
                </span>
              </span>
            }
          >
            <FilterMarkers
              style={{ paddingBottom: 20, width: 200, marginLeft: 24 }}
            />
          </SubMenu>
        </SubMenu>
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data,
  poiMarkers: state.poiMarkers,
  mapMarkerTypes: state.mapMarkerTypes,
  customPath: state.customPath,
  terrain: state.terrain,
  startPoint: state.startPoint,
  endPoint: state.endPoint,
  focusMarker: state.focusMarker,
  filters: state.filters
})

export default connect(mapStateToProps)(Sider)
