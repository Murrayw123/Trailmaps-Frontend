import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterTrailMarkers, storeCustomTrack } from '../redux/actions'
import { Menu, Icon, Divider } from 'antd'
import DistanceCalculator from './DistanceCalculator'
import DistanceCalculatorForm from './DistanceCalculatorForm'
import FilterMarkers from './Markers'
import CustomJourney from './CustomJourney'
import findPath from './helpers/PathCalculator'
import { changeZoomLevel, changeFocusPoint } from '../redux/actions'

const SubMenu = Menu.SubMenu

class Sider extends React.Component {
  state = {
    start: [],
    end: [],
    startVal: '',
    endVal: '',
    buttonDisabled: true
  } //holds the start and finish points for the distance calculator tab

  dataSelect = (markerid, type) => {
    let newFocus = this.props.poiMarkers.find(el => {
      return el.marker_id === parseInt(markerid)
    })
    if (type === 'locate') {
      this.props.dispatch(changeZoomLevel(13))
      this.props.dispatch(
        changeFocusPoint([newFocus.marker_lat, newFocus.marker_lng])
      )
    } else {
      this.setState({ [type]: [newFocus.marker_lat, newFocus.marker_lng] })
    }
    if (this.state.start.length || this.state.end.length) {
      this.setState({ buttonDisabled: false })
    }
  }

  submitDistance = e => {
    e.preventDefault()
    let pathAndDistance = this.calculateInfo()
    this.props.dispatch(storeCustomTrack(pathAndDistance))
  }

  calculateInfo = () => {
    //deals with custom route finding
    let pathObj = [
      { latlng: { lat: this.state.start[0], lng: this.state.start[1] } },
      { latlng: { lat: this.state.end[0], lng: this.state.end[1] } }
    ]
    let pathAndDistance = findPath(
      this.props.data.map_track,
      pathObj[0],
      pathObj[1]
    )
    return pathAndDistance
  }

  inputDirty = () => {
    this.setState({ buttonDisabled: true })
  }

  filterMarkers = markers => {
    this.props.dispatch(filterTrailMarkers(markers))
  }

  render() {
    const { data, poiMarkers, mapMarkerTypes, customPath } = this.props
    return (
      <Menu
        className="overlayMenu"
        onClick={this.handleClick}
        style={{ width: 350 }}
        defaultOpenKeys={['menu']}
        mode="inline"
      >
        <SubMenu
          key="menu"
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
            <div style={{ marginLeft: 48 }}>
              <DistanceCalculator
                placeHolder={'Point on map'}
                dataSource={poiMarkers}
                type={'locate'}
                dataSelect={this.dataSelect}
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
              buttonDisabled={this.state.buttonDisabled}
              inputOnChange={this.inputOnChange}
              inputDirty={this.inputDirty}
              submitDistance={this.submitDistance}
            />
            {customPath ? <h1> {customPath.distance} </h1> : null}
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
              style={{ marginLeft: 48, width: 200 }}
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
          />
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
              style={{ paddingBottom: 20, width: 200, marginLeft: 48 }}
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
  customPath: state.customPath
})

export default connect(mapStateToProps)(Sider)
