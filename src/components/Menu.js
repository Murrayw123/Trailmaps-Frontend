import React from "react";
import { connect } from "react-redux";
import {
  allowCustomPath,
  changeFocusPoint,
  changeTerrain,
  changeZoomLevel,
  filterTrailMarkers,
  setEndPoint,
  setOpenMenus,
  setStartPoint,
  storeCustomTrack,
  storeFocusMarker,
  toggleLiveTrailUsers,
  wipeEndMarker,
  wipeMarkers,
  wipeMarkersAndPath,
  wipeStartMarker
} from "../redux/actions";
import { Card, Divider, Icon, Menu, Switch, Tooltip } from "antd";
import _ from "lodash";
import DistanceCalculator from "./DistanceCalculator";
import DistanceCalculatorForm from "./DistanceCalculatorForm";
import FilterMarkers from "./Markers";
import { TerrainSwitch } from "./TerrainSwitch";
import { findPath } from "./helpers/PathCalculator";

export const DISTANCE_KEY = "distanceTab";

const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
  dataSelect = (markerid, type) => {
    let newFocus = this.props.poiMarkers
      .concat(this.props.liveTrailUsers)
      .find(el => {
        return el.marker_id === parseInt(markerid);
      });
    if (type === "locate") {
      this.props.dispatch(changeZoomLevel(13));
      this.props.dispatch(
        changeFocusPoint([newFocus.marker_lat, newFocus.marker_lng])
      );
      this.props.dispatch(storeFocusMarker(newFocus));
    } else if (type === "start") {
      this.props.dispatch(wipeStartMarker());
      this.props.dispatch(setStartPoint(newFocus));
    } else {
      this.props.dispatch(wipeEndMarker());
      this.props.dispatch(setEndPoint(newFocus));
    }
  };

  submitDistance = e => {
    e.preventDefault();
    let pathAndDistance = this.calculateInfo();
    this.props.dispatch(storeCustomTrack(pathAndDistance));
  };

  clearPath = e => {
    e.preventDefault();
    this.props.dispatch(wipeMarkersAndPath());
  };

  calculateInfo = () => {
    //deals with custom route finding
    let pathObj = [
      {
        start: {
          marker_lat: this.props.startPoint.marker_lat,
          marker_lng: this.props.startPoint.marker_lng
        }
      },
      {
        finish: {
          marker_lat: this.props.endPoint.marker_lat,
          marker_lng: this.props.endPoint.marker_lng
        }
      }
    ];
    let pathAndDistance = findPath(
      this.props.data.map_track,
      pathObj[0].start,
      pathObj[1].finish
    );
    return pathAndDistance;
  };

  filterMarkers = markers => {
    this.props.dispatch(filterTrailMarkers(markers));
  };

  terrainSwitch = value => {
    this.props.dispatch(changeTerrain(value));
  };

  toggleCustomPath = bool => {
    this.props.dispatch(wipeMarkers());
    if (this.props.startPoint.marker_title === "Custom Map Point") {
      this.props.dispatch(setStartPoint({}));
    }
    if (this.props.endPoint.marker_title === "Custom Map Point") {
      this.props.dispatch(setEndPoint({}));
    }
    this.props.dispatch(allowCustomPath(bool));
  };

  toggleShowLiveTrailUsers = bool => {
    this.props.dispatch(toggleLiveTrailUsers(bool));
  };

  isButtonDisabled = () => {
    let startEmpty = _.isEmpty(this.props.startPoint);
    let endEmpty = _.isEmpty(this.props.endPoint);
    if (startEmpty || endEmpty) {
      return true;
    } else {
      //both are not empty
      return false;
    }
  };

  handleMenuOpen = menuKeys => {
    this.props.dispatch(setOpenMenus(menuKeys));
  };

  render() {
    const {
      data,
      poiMarkers,
      mapMarkerTypes,
      sideBarImage,
      sideBarBlurb,
      terrain,
      focusMarker,
      filters,
      openKeys,
      liveTrailUsers
    } = this.props;
    return (
      <Menu
        className="overlayMenu"
        onOpenChange={this.handleMenuOpen}
        style={{ width: 300, opacity: 0.9 }}
        defaultOpenKeys={["menu", "sub5"]}
        openKeys={openKeys}
        mode="inline"
      >
        <SubMenu
          key="menu"
          className="title"
          title={
            <span>
              <Icon
                style={{ fontSize: "1.4em" }}
                type="setting"
                theme="outlined"
                className="icons-large"
              />
              <span id="map-tool-heading"> Map Tools</span>
            </span>
          }
        >
          <Divider style={{ margin: 0 }} />
          <SubMenu
            style={{ paddingTop: 40 }}
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
                placeHolder={"Point on map"}
                dataSource={poiMarkers}
                type={"locate"}
                onSelect={this.dataSelect}
                value={focusMarker}
              />
            </div>
          </SubMenu>
          <SubMenu
            key={DISTANCE_KEY}
            title={
              <span>
                <Icon type="calculator" theme="outlined" className="sub-icon" />
                <span className="sub-heading">Distance and Elevation</span>
              </span>
            }
          >
            <DistanceCalculatorForm
              dataSource={poiMarkers}
              dataSelect={this.dataSelect}
              buttonDisabled={this.isButtonDisabled()}
              submitDistance={this.submitDistance}
              clearPath={this.clearPath}
              toggleCustomPath={this.toggleCustomPath}
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
              style={{ marginLeft: 48, width: 200 }}
            />
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="user" theme="outlined" className="sub-icon" />
                <span className="sub-heading"> Live Trail Users</span>
              </span>
            }
          >
            <div style={{ marginLeft: 48 }}>
              <Card
                className="filter-trail-users"
                bordered={false}
                style={{ width: 250 }}
              >
                <span>
                  Show all live trail users
                  <Tooltip title="Find users with a registered SPOT GPS device">
                    <Icon
                      style={{ paddingLeft: 4, fontSize: 12 }}
                      type="question-circle"
                    />
                  </Tooltip>
                  <Switch
                    size="small"
                    style={{ marginLeft: 5 }}
                    checked={this.props.showLiveTrailUsers}
                    onChange={this.toggleShowLiveTrailUsers}
                  />
                </span>
              </Card>
              <DistanceCalculator
                placeHolder={"Find Trail User"}
                dataSource={liveTrailUsers}
                type={"locate"}
                onSelect={this.dataSelect}
                value={focusMarker}
              />
            </div>
          </SubMenu>
          <SubMenu
            key="sub5"
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
              style={{ marginLeft: 48, width: 200 }}
            />
          </SubMenu>
          <SubMenu
            key="sub6"
            title={
              <span>
                <Icon type="info-circle" />
                <span className="sub-heading">Map & Marker Information</span>
              </span>
            }
          >
            <Card bordered={false} className="info-card">
              {!_.isEmpty(sideBarImage) &&
              sideBarImage !== "" &&
              sideBarImage != null ? (
                <span>
                  <img className="map-blurb-img" src={sideBarImage} />
                </span>
              ) : null}
              <Divider className="map-info-divider" />
              <p style={{ marginRight: 20 }}>
                <b> Information: </b>
                {_.isEmpty(focusMarker)
                  ? sideBarBlurb
                  : focusMarker.marker_blurb}
              </p>
              <p>
                <Divider className="map-info-divider" />
                <div>
                  {!_.isEmpty(data.map_stats) && _.isEmpty(focusMarker)
                    ? data.map_stats.map(el => {
                        return (
                          <div>
                            <b>{el.key}</b> : {el.value}
                          </div>
                        );
                      })
                    : null}
                </div>
              </p>
            </Card>
          </SubMenu>
        </SubMenu>
      </Menu>
    );
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
  filters: state.filters,
  sideBarImage: state.sideBarImage,
  sideBarBlurb: state.sideBarBlurb,
  openKeys: state.openKeys,
  showLiveTrailUsers: state.showLiveTrailUsers,
  liveTrailUsers: state.liveTrailUsers
});

export default connect(mapStateToProps)(Sider);
