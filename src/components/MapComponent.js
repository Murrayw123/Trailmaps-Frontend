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
  wipeMarkersAndPath
} from "../redux/actions";
import {
  bicycle,
  business_groupings,
  finish,
  food_groupings,
  start,
  walking,
  rider,
  hiker
} from "./helpers/iconsData";
import { findPath } from "./helpers/PathCalculator";
import "leaflet/dist/leaflet.css";
import { GeoJSON, Map, Marker, TileLayer, ZoomControl } from "react-leaflet";
import PoiMarker from "./PoiMarker";

class MapComponent extends Component {
  checkMarkers = e => {
    let startPointCheckEmpty = _.isEmpty(this.props.startPoint);
    let endPointCheckEmpty = _.isEmpty(this.props.endPoint);
    //allow a maximum of two clicks before resetting the path
    if (this.props.allowCustomPath) {
      if (startPointCheckEmpty) {
        e.startEnd = "start";
        this.addCustomMarker(e);
      } else if (endPointCheckEmpty) {
        e.startEnd = "end";
        this.addCustomMarker(e);
      } else {
        e.startEnd = "start";
        this.props.wipeMarkersAndPath();
        this.addCustomMarker(e);
      }
    }
  };

  addCustomMarker(e) {
    let newMarker = {
      marker_title: "Custom Map Point",
      marker_lat: e.latlng.lat,
      marker_lng: e.latlng.lng
    };
    if (!this.props.openKeys.includes("distanceTab")) {
      this.props.openDistanceTab();
    }
    if (e.startEnd === "start") {
      this.props.addMapMarkerStart(newMarker);
      this.props.setStartPoint(newMarker);
    } else {
      this.props.addMapMarkerEnd(newMarker);
      this.props.setEndPoint(newMarker);
    }
  }

  draggableMarker = marker => {
    let startPointCheckEmpty = _.isEmpty(this.props.startPoint);
    let endPointCheckEmpty = _.isEmpty(this.props.endPoint);
    const updatedMarker = {
      marker_title: "Custom Map Point",
      marker_lat: marker.target._latlng.lat,
      marker_lng: marker.target._latlng.lng
    };
    if (marker.startEnd === "start") {
      this.props.addMapMarkerStart(updatedMarker);
      this.props.setStartPoint(updatedMarker);
    } else {
      this.props.addMapMarkerEnd(updatedMarker);
      this.props.setEndPoint(updatedMarker);
    }
    if (!startPointCheckEmpty && !endPointCheckEmpty) {
      //if the draggable marker is being updated on an existing path
      this.updatePath();
    }
  };

  updatePath = () => {
    let pathAndDistance = findPath(
      this.props.data.map_track,
      this.props.startPoint,
      this.props.endPoint
    );
    this.props.storeCustomTrack(pathAndDistance);
  };

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

  shouldShowMarker = marker => {
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

  onClickMarker = marker => {
    this.props.storeFocusMarker(marker);
    this.props.changeSideBarData(marker.marker_blurb, marker.default_image);
  };

  filterMarkers = () => {
    //if the marker is in the filtered list
    let validMarkers = [];
    this.props.poiMarkers.map(marker => {
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
      showLiveTrailUsers
    } = this.props;
    let terrainURL =
      "https://maps.tilehosting.com/styles/" +
      terrain +
      "/{z}/{x}/{y}.png?key=7qrAZ6R0EFPZMiyEp2m4";
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
          return marker;
        })}

        {showLiveTrailUsers
          ? //Spot users
            liveTrailUsers.map(trailUser => {
              return (
                <PoiMarker marker={trailUser} onClick={this.onClickMarker} />
              );
            })
          : null}

        {mapMarkerStart ? (
          //custom markers from click event
          <Marker
            key={mapMarkerStart.distance}
            position={[mapMarkerStart.marker_lat, mapMarkerStart.marker_lng]}
            icon={start}
            draggable={true}
            onDragEnd={e => {
              e.startEnd = "start";
              return this.draggableMarker(e);
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
            onDragEnd={e => {
              e.startEnd = "end";
              return this.draggableMarker(e);
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

const mapDispatchToProps = dispatch => ({
  addMapMarkerStart: e => {
    dispatch(addMapMarkerStart(e));
  },
  addMapMarkerEnd: e => {
    dispatch(addMapMarkerEnd(e));
  },
  storeDistance: distance => {
    dispatch(storeDistance(distance));
  },
  calcElevation: elevation => {
    dispatch(storeElevation(elevation));
  },
  storeCustomTrack: path => {
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
  storeFocusMarker: marker => {
    dispatch(storeFocusMarker(marker));
  },
  setStartPoint: marker => {
    dispatch(setStartPoint(marker));
  },
  setEndPoint: marker => {
    dispatch(setEndPoint(marker));
  }
});

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
  mapMarkerEnd: state.mapMarkerEnd,
  allowCustomPath: state.allowCustomPath,
  openKeys: state.openKeys,
  showLiveTrailUsers: state.showLiveTrailUsers,
  liveTrailUsers: state.liveTrailUsers
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponent);
