import React from "react";
import { connect } from "react-redux";
import {
  allowCustomPath,
  changeFocusPoint,
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
  wipeStartMarker,
} from "../redux/actions";
import { Menu } from "antd";
import _ from "lodash";
import DistanceCalculatorForm from "./DistanceCalculatorForm";
import FilterMarkers from "./Markers";
import { findPath } from "helpers/PathCalculator";
import { SpotMenuComponent } from "components/SpotMenuComponent";
import { PointOnMap } from "components/MenuComponents/PointOnMapComponent";
import { MapAndMarkerInfoComponent } from "components/MenuComponents/MapAndMarkerInfoComponent";
import {
  DistanceAndElevation,
  FilterMarkersHeader,
  LiveTrailUsers,
  LocatePoint,
  MapAndMarkerInformation,
  MapTools,
} from "components/MenuComponents/Headings";

export const DISTANCE_KEY = "distanceTab";

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

class Sider extends React.Component<any, any> {
  dataSelect = (markerid, type, markerType) => {
    let newFocus;
    if (markerType === "distance") {
      newFocus = this.props.poiMarkers.find((el) => {
        return el.id === parseInt(markerid);
      });
    }
    if (markerType === "liveTrailUser") {
      newFocus = this.props.liveTrailUsers.find((el) => {
        return el.id === parseInt(markerid);
      });
    }
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

  submitDistance = (e) => {
    e.preventDefault();
    const pathAndDistance = this.calculateInfo();
    this.props.dispatch(storeCustomTrack(pathAndDistance));
  };

  clearPath = (e) => {
    e.preventDefault();
    this.props.dispatch(wipeMarkersAndPath());
  };

  calculateInfo = () => {
    //deals with custom route finding
    const pathObj = [
      {
        start: {
          marker_lat: this.props.startPoint.marker_lat,
          marker_lng: this.props.startPoint.marker_lng,
        },
      },
      {
        finish: {
          marker_lat: this.props.endPoint.marker_lat,
          marker_lng: this.props.endPoint.marker_lng,
        },
      },
    ];
    const pathAndDistance = findPath(
      this.props.data.map_track,
      pathObj[0].start,
      pathObj[1].finish
    );
    return pathAndDistance;
  };

  filterMarkers = (markers) => {
    this.props.dispatch(filterTrailMarkers(markers));
  };

  toggleCustomPath = (bool) => {
    this.props.dispatch(wipeMarkers());
    if (this.props.startPoint.marker_title === "Custom Map Point") {
      this.props.dispatch(setStartPoint({}));
    }
    if (this.props.endPoint.marker_title === "Custom Map Point") {
      this.props.dispatch(setEndPoint({}));
    }
    this.props.dispatch(allowCustomPath(bool));
  };

  toggleShowLiveTrailUsers = (bool) => {
    this.props.dispatch(toggleLiveTrailUsers(bool));
  };

  isButtonDisabled = () => {
    const startEmpty = _.isEmpty(this.props.startPoint);
    const endEmpty = _.isEmpty(this.props.endPoint);
    if (startEmpty || endEmpty) {
      return true;
    } else {
      //both are not empty
      return false;
    }
  };

  handleMenuOpen = (menuKeys) => {
    this.props.dispatch(setOpenMenus(menuKeys));
  };

  render() {
    const {
      data,
      poiMarkers,
      mapMarkerTypes,
      sideBarImage,
      sideBarBlurb,
      focusMarker,
      filters,
      openKeys,
      liveTrailUsers,
    } = this.props;
    return (
      <Menu
        key={1}
        className="overlayMenu"
        onOpenChange={this.handleMenuOpen}
        style={{ width: 300 }}
        defaultOpenKeys={["menu", "mapMarkerInformation"]}
        selectable={false}
        openKeys={openKeys}
        mode="inline"
        inlineIndent={15}
      >
        <SubMenu key="menu" className="title" title={<MapTools />}>
          <SubMenu
            key={"pointOnMap"}
            title={<LocatePoint />}
            className={"point-on-map"}
          >
            <Item>
              <PointOnMap
                poiMarkers={poiMarkers}
                dataSelect={this.dataSelect}
                focusMarker={focusMarker}
              />
            </Item>
          </SubMenu>
          <SubMenu
            key={DISTANCE_KEY}
            title={<DistanceAndElevation />}
            className={"distance-calculator"}
          >
            <Item>
              <DistanceCalculatorForm
                dataSource={poiMarkers}
                dataSelect={this.dataSelect}
                buttonDisabled={this.isButtonDisabled()}
                submitDistance={this.submitDistance}
                clearPath={this.clearPath}
                toggleCustomPath={this.toggleCustomPath}
              />
            </Item>
          </SubMenu>
          <SubMenu
            key={"filterMarkers"}
            title={<FilterMarkersHeader />}
            className={"filter-options"}
          >
            <Item>
              <FilterMarkers
                mapMarkerTypes={mapMarkerTypes}
                filterMarkers={this.filterMarkers}
                currentFilters={filters}
                style={{ width: 200 }}
              />
            </Item>
          </SubMenu>
          <SubMenu
            key="trail-users"
            title={<LiveTrailUsers />}
            className={"trail-users"}
          >
            <Item>
              <SpotMenuComponent
                showLiveTrailUsers={this.toggleShowLiveTrailUsers}
                focusMarker={focusMarker}
                liveTrailUsers={liveTrailUsers}
                dataSelect={this.dataSelect}
                toggleShowLiveTrailUsers={this.toggleShowLiveTrailUsers}
              />
            </Item>
          </SubMenu>
          <SubMenu
            key="mapMarkerInformation"
            title={<MapAndMarkerInformation />}
            className={"map-marker-info"}
          >
            <Item>
              <MapAndMarkerInfoComponent
                sideBarImage={sideBarImage}
                focusMarker={focusMarker}
                sideBarBlurb={sideBarBlurb}
                data={data}
              />
            </Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
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
  liveTrailUsers: state.liveTrailUsers,
  focusTrailUser: state.focusTrailUser,
});

export default connect(mapStateToProps)(Sider);
