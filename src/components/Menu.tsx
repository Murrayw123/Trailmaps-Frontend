import React from "react";
import { connect } from "react-redux";
import {
  allowCustomPath,
  filterTrailMarkers,
  setEndPoint,
  setOpenMenus,
  setStartPoint,
  storeCustomTrack,
  toggleLiveTrailUsers,
  wipeMarkers,
  wipeMarkersAndPath,
} from "redux/actions";
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
import { findMarker, selectMarker } from "components/MenuHelpers";
import { GlobalState } from "Interfaces/GlobalState";
import { Dispatch } from "redux";

export const DISTANCE_KEY = "distanceTab";

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

interface Props {
  mapData: GlobalState["mapData"];
  poiMarkers: GlobalState["poiMarkers"];
  liveTrailUsers: GlobalState["liveTrailUsers"];
  dispatch: Dispatch;
  startPoint: GlobalState["startPoint"];
  endPoint: GlobalState["endPoint"];
  sideBarImage: GlobalState["sideBarImage"];
  mapMarkerTypes: GlobalState["mapMarkerTypes"];
  sideBarBlurb: GlobalState["sideBarBlurb"];
  focusMarker: GlobalState["focusMarker"];
  filters: GlobalState["filters"];
  openKeys: GlobalState["openKeys"];
}

class SidebarMenu extends React.Component<Props, any> {
  dataSelect = (markerId: string, type: string, markerType: string): void => {
    const { poiMarkers, liveTrailUsers, dispatch } = this.props;
    const marker = findMarker(markerType, poiMarkers, markerId, liveTrailUsers);
    return selectMarker(type, dispatch, marker);
  };

  submitDistance = (e) => {
    e.preventDefault();
    const pathAndDistance = this.findCustomRoute();
    this.props.dispatch(storeCustomTrack(pathAndDistance));
  };

  clearPath = (e) => {
    e.preventDefault();
    this.props.dispatch(wipeMarkersAndPath());
  };

  findCustomRoute = () => {
    //deals with custom route finding
    const pathObj = [
      {
        start: {
          lat: this.props.startPoint.lat,
          lng: this.props.startPoint.lng,
        },
      },
      {
        finish: {
          lat: this.props.endPoint.lat,
          lng: this.props.endPoint.lng,
        },
      },
    ];
    return findPath(
      this.props.mapData.track,
      pathObj[0].start,
      pathObj[1].finish
    );
  };

  filterMarkers = (markers) => {
    this.props.dispatch(filterTrailMarkers(markers));
  };

  toggleCustomPath = (bool) => {
    this.props.dispatch(wipeMarkers());
    if (this.props.startPoint.title === "Custom Map Point") {
      this.props.dispatch(setStartPoint({}));
    }
    if (this.props.endPoint.title === "Custom Map Point") {
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
    return !!(startEmpty || endEmpty);
  };

  handleMenuOpen = (menuKeys) => {
    this.props.dispatch(setOpenMenus(menuKeys));
  };

  render() {
    const {
      mapData,
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
                dispatch={this.props.dispatch}
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
                mapData={mapData}
              />
            </Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  mapData: state.mapData,
  poiMarkers: state.poiMarkers,
  mapMarkerTypes: state.mapMarkerTypes,
  customPath: state.customPath,
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

export default connect(mapStateToProps)(SidebarMenu);
