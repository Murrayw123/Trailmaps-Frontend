import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  addMapMarkerEnd,
  addMapMarkerStart,
  changeSideBarData,
  openDistanceTab,
  setEndPoint,
  setStartPoint,
  storeCustomTrack,
  storeDistance,
  storeElevation,
  storeFocusMarker,
  wipeMarkersAndPath,
  setLatLngFromContextClick,
  shouldShowContextMenu,
  fetchElevation,
} from "redux/actions";
import {
  bicycle,
  business_groupings,
  finish,
  food_groupings,
  start,
  walking,
} from "helpers/iconsData";
import "leaflet/dist/leaflet.css";
import { GeoJSON, Map, Marker, TileLayer, ZoomControl } from "react-leaflet";
import ContextMenu from "./ContextMenuApp";
import PoiMarker from "components/PoiMarker";
import { Context, ServicesContext } from "ServiceInit";
import { END, START } from "services/MarkerAdd";

interface Props {}

interface State {
  rightClickXCoord: number;
  rightClickYCoord: number;
}

class MapComponent extends Component<any, State> {
  public context: Context;

  state = { rightClickXCoord: 0, rightClickYCoord: 0 };
  static contextType = ServicesContext;

  checkForCustomPath = () => {
    //if there is a custom route to display, display it
    if (
      Object.keys(this.props.customPath).length &&
      this.props.customPath.path
    ) {
      return (
        <GeoJSON
          key={this.props.customPath.elevationChartData.length}
          data={this.props.customPath.path}
          interactive={false}
          color="red"
        />
      );
    }
  };

  shouldShowMarker = (marker) => {
    let startPoint = this.props.startPoint;
    let endPoint = this.props.endPoint;
    let focusMarker = this.props.focusMarker;
    if (!_.isEmpty(startPoint)) {
      if (startPoint.marker_id === marker.marker_id) {
        return true;
      }
    }
    if (!_.isEmpty(endPoint)) {
      if (endPoint.marker_id === marker.marker_id) {
        return true;
      }
    }
    if (!_.isEmpty(focusMarker)) {
      let business = business_groupings.includes(marker.marker_type);
      let food = food_groupings.includes(marker.marker_type);
      if (
        (focusMarker.marker_id === marker.marker_id &&
          this.props.filters.includes(focusMarker.marker_type)) ||
        (business && this.props.filters.includes("trail businesses")) ||
        (food && this.props.filters.includes("drinks & dining"))
      ) {
        return true;
      }
    }
    return false;
  };

  onClickMarker = (marker) => {
    this.props.storeFocusMarker(marker);
    this.props.changeSideBarData(marker.marker_blurb, marker.default_image);
  };

  filterMarkers = () => {
    //if the marker is in the filtered list
    let validMarkers = [];
    this.props.poiMarkers.map((marker) => {
      let business = business_groupings.includes(marker.marker_type);
      let food = food_groupings.includes(marker.marker_type);
      if (
        this.props.filters.includes(marker.marker_type) ||
        (business && this.props.filters.includes("trail businesses")) ||
        (food && this.props.filters.includes("drinks & dining")) ||
        this.shouldShowMarker(marker)
      ) {
        validMarkers.push(
          <PoiMarker marker={marker} onClick={this.onClickMarker} />
        );
      }
    });
    return validMarkers;
  };

  rightClick = (event) => {
    this.setState({
      rightClickXCoord: event.containerPoint.x,
      rightClickYCoord: event.containerPoint.y,
    });

    this.context.markerAdd.onMapRightClick(event);
  };

  checkMarkers = (event: any): void => {
    this.context.markerAdd.checkMarkers(event);
  };

  draggableMarkerStart = (event: any): void => {
    this.context.markerAdd.createDraggableMarker(event, START);
  };

  draggableMarkerEnd = (event: any): void => {
    this.context.markerAdd.createDraggableMarker(event, END);
  };

  render() {
    const {
      data,
      center,
      zoom,
      terrain,
      customDistanceMarker,
      mapMarkerStart,
      mapMarkerEnd,
      liveTrailUsers,
      showLiveTrailUsers,
      shouldShowContextMenuStatus,
    } = this.props;
    const imageryUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    return (
      <Map
        center={center}
        zoom={zoom}
        className="map"
        zoomControl={false}
        onClick={this.checkMarkers}
        onContextMenu={this.rightClick}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          url={imageryUrl}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON interactive={false} data={data.map_track} />

        {this.checkForCustomPath()}
        {this.filterMarkers().map((marker) => {
          return marker;
        })}

        {showLiveTrailUsers
          ? //Spot users
            liveTrailUsers.map((trailUser) => {
              return (
                <PoiMarker marker={trailUser} onClick={this.onClickMarker} />
              );
            })
          : null}

        {shouldShowContextMenuStatus ? (
          <ContextMenu
            x={this.state.rightClickXCoord}
            y={this.state.rightClickYCoord}
          />
        ) : null}

        {mapMarkerStart ? (
          //custom markers from click event
          <Marker
            key={mapMarkerStart.distance}
            position={[mapMarkerStart.marker_lat, mapMarkerStart.marker_lng]}
            icon={start}
            draggable={true}
            onDragEnd={(e) => {
              return this.draggableMarkerStart(e);
            }}
            className="map-marker-custom"
          />
        ) : null}

        {mapMarkerEnd ? (
          //custom markers from click event
          <Marker
            key={mapMarkerEnd.distance}
            position={[mapMarkerEnd.marker_lat, mapMarkerEnd.marker_lng]}
            icon={finish}
            draggable={true}
            onDragEnd={(e) => {
              return this.draggableMarkerEnd(e);
            }}
            className="map-marker-custom"
          />
        ) : null}

        {customDistanceMarker.length ? (
          //custom marker from elevation click hover
          <Marker
            key={1}
            position={customDistanceMarker}
            icon={
              this.props.data.map_type.toLowerCase() === "cycling"
                ? bicycle
                : walking
            }
          />
        ) : null}
      </Map>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addMapMarkerStart: (e) => {
    dispatch(addMapMarkerStart(e));
  },
  addMapMarkerEnd: (e) => {
    dispatch(addMapMarkerEnd(e));
  },
  storeDistance: (distance) => {
    dispatch(storeDistance(distance));
  },
  calcElevation: (elevation) => {
    dispatch(storeElevation(elevation));
  },
  storeCustomTrack: (path) => {
    dispatch(storeCustomTrack(path));
  },
  wipeMarkersAndPath: () => {
    dispatch(wipeMarkersAndPath());
  },
  openDistanceTab: () => {
    dispatch(openDistanceTab());
  },
  changeSideBarData: (blurb, image) => {
    dispatch(changeSideBarData(blurb, image));
  },
  storeFocusMarker: (marker) => {
    dispatch(storeFocusMarker(marker));
  },
  setStartPoint: (marker) => {
    dispatch(setStartPoint(marker));
  },
  setEndPoint: (marker) => {
    dispatch(setEndPoint(marker));
  },
  setLatLngFromContextClick: (latLng) => {
    dispatch(setLatLngFromContextClick(latLng));
  },
  shouldShowContextMenu: (bool) => {
    dispatch(shouldShowContextMenu(bool));
  },
  fetchElevation: (lat, lng) => {
    dispatch(fetchElevation(lat, lng));
  },
});

const mapStateToProps = (state) => ({
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
  mapMarkerEnd: state.mapMarkerEnd,
  allowCustomPath: state.allowCustomPath,
  openKeys: state.openKeys,
  showLiveTrailUsers: state.showLiveTrailUsers,
  liveTrailUsers: state.liveTrailUsers,
  shouldShowContextMenuStatus: state.shouldShowContextMenuStatus,
  shouldShowModal: state.shouldShowModal,
});

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
