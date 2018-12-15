import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {
    addMapMarkerEnd,
    addMapMarkerStart,
    changeSideBarData,
    openDistanceTab,
    storeCustomTrack,
    storeDistance,
    storeElevation,
    storeFocusMarker,
    wipeMarkersAndPath
} from "../redux/actions";
import {findPath, isMarkersValid} from "./helpers/PathCalculator";
import {GeoJSON, Map, Marker, TileLayer, ZoomControl} from "react-leaflet";
import {bicycle, finish, start, walking} from "./helpers/iconsData";
import PoiMarker from "./PoiMarker";

class MapComponent extends Component {
  state = { markerCounter: 0 };

  checkMarkers = e => {
    //allow a maximum of two clicks before resetting the path
    if (this.props.allowCustomPath) {
      if (this.state.markerCounter === 0) {
        this.setState({ markerCounter: this.state.markerCounter + 1 });
        e.startEnd = "start";
        this.addCustomMarker(e);
      } else if (this.state.markerCounter === 1) {
        this.setState({ markerCounter: this.state.markerCounter + 1 });
        e.startEnd = "end";
        this.addCustomMarker(e);
      } else {
        e.startEnd = "start";
        this.props.wipeMarkersAndPath();
        this.setState({ markerCounter: 1 });
        this.addCustomMarker(e);
      }
    }
  };

  addCustomMarker(e) {
    if (e.startEnd === "start") {
      this.props.addMapMarkerStart(e);
    } else {
      this.props.addMapMarkerEnd(e);
      if (
        isMarkersValid(
          this.props.data.map_track,
          this.props.mapMarkerStart,
          this.props.mapMarkerEnd
        )
      ) {
        //if the markers aren't too far away
        let pathAndDistance = findPath(
          this.props.data.map_track,
          this.props.mapMarkerStart,
          this.props.mapMarkerEnd
        );
        this.props.storePath(pathAndDistance);
        if (!this.props.openKeys.includes("distanceTab")) {
          this.props.openDistanceTab();
        }
      } else {
        this.props.wipeMarkersAndPath();
      }
    }
  }

  draggableMarker = e => {
    e.latlng = { lat: e.target._latlng.lat, lng: e.target._latlng.lng };
    if (e.startEnd === "start") {
      this.props.addMapMarkerStart(e);
    } else {
      this.props.addMapMarkerEnd(e);
    }
    let pathAndDistance = findPath(
      this.props.data.map_track,
      this.props.mapMarkerStart,
      this.props.mapMarkerEnd
    );
    this.props.storePath(pathAndDistance);
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
      if (focusMarker.marker_id === marker.marker_id) {
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
      if (
        this.props.filters.includes(marker.marker_type) ||
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
      customPath,
      center,
      zoom,
      terrain,
      customDistanceMarker,
      mapMarkerStart,
      mapMarkerEnd
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

        {mapMarkerStart ? (
          //custom markers from click event
          <Marker
            key={mapMarkerStart.distance}
            position={[mapMarkerStart.latlng.lat, mapMarkerStart.latlng.lng]}
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
            position={[mapMarkerEnd.latlng.lat, mapMarkerEnd.latlng.lng]}
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
  storePath: path => {
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
  openKeys: state.openKeys
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponent);
