import React, { Component, ReactElement } from "react";
import { connect } from "react-redux";
import { bicycle, finish, start, walking } from "helpers/iconsData";
import "leaflet/dist/leaflet.css";
import { GeoJSON, Map, Marker, TileLayer, ZoomControl } from "react-leaflet";
import ContextMenu from "./ContextMenuApp";
import PoiMarker from "components/PoiMarker";
import { Context, ServicesContext } from "ServiceInit";
import { END, START } from "services/MarkerAdd";
import { GlobalState } from "redux/reducers";

interface Props {
  customPath: GlobalState["customPath"];
  data: GlobalState["data"];
  center: GlobalState["center"];
  zoom: GlobalState["zoom"];
  customDistanceMarker: GlobalState["customDistanceMarker"];
  mapMarkerStart: GlobalState["mapMarkerStart"];
  mapMarkerEnd: GlobalState["mapMarkerEnd"];
  liveTrailUsers: GlobalState["liveTrailUsers"];
  showLiveTrailUsers: GlobalState["showLiveTrailUsers"];
  shouldShowContextMenuStatus: GlobalState["shouldShowContextMenuStatus"];
  elevationChartData: any;
}

interface State {
  rightClickXCoord: number;
  rightClickYCoord: number;
}

const imageryUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

class MapComponent extends Component<Props, State> {
  public context: Context;

  state = { rightClickXCoord: 0, rightClickYCoord: 0 };
  static contextType = ServicesContext;

  rightClick = (event) => {
    this.setState({
      rightClickXCoord: event.containerPoint.x,
      rightClickYCoord: event.containerPoint.y,
    });

    this.context.markerAdd.onMapRightClick(event);
  };

  onMarkerClick = (marker: any): void => {
    this.context.markerAdd.onMarkerClick(marker);
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

  customPath = (): ReactElement => {
    if (shouldDisplayCustomPath(this.props.customPath)) {
      return (
        <GeoJSON
          key={this.props.customPath.elevationChartData.length}
          data={this.props.customPath.path}
          interactive={false}
          color="red"
        />
      );
    } else {
      return null;
    }
  };

  poiMarkers = (): Array<ReactElement> => {
    return this.context.markerAdd.markersInFilteredList.map((marker) => {
      return <PoiMarker marker={marker} onClick={this.onMarkerClick} />;
    });
  };

  liveTrailUsers = (): Array<ReactElement> => {
    if (this.props.showLiveTrailUsers) {
      return this.props.liveTrailUsers.map((trailUser) => {
        return <PoiMarker marker={trailUser} onClick={this.onMarkerClick} />;
      });
    }
  };

  contextMenuStatus = (): ReactElement => {
    if (this.props.shouldShowContextMenuStatus) {
      return (
        <ContextMenu
          x={this.state.rightClickXCoord}
          y={this.state.rightClickYCoord}
        />
      );
    }
  };

  mapMarkerStart = (): ReactElement => {
    const { mapMarkerStart } = this.props;

    if (mapMarkerStart) {
      return (
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
      );
    }
  };

  mapMarkerEnd = (): ReactElement => {
    const { mapMarkerEnd } = this.props;

    if (mapMarkerEnd) {
      return (
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
      );
    }
  };

  customDistanceMarker = (): ReactElement => {
    const { customDistanceMarker } = this.props;

    if (customDistanceMarker.length) {
      //custom marker from elevation click hover
      return (
        <Marker
          key={1}
          position={customDistanceMarker}
          icon={
            this.props.data.map_type.toLowerCase() === "cycling"
              ? bicycle
              : walking
          }
        />
      );
    }
  };

  render() {
    const { data, center, zoom } = this.props;
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

        {this.customPath()}

        {this.poiMarkers()}

        {this.liveTrailUsers()}

        {this.contextMenuStatus()}

        {this.mapMarkerStart()}

        {this.mapMarkerEnd()}

        {this.customDistanceMarker()}
      </Map>
    );
  }
}

const mapStateToProps = (state) => ({
  customPath: state.customPath,
  data: state.data,
  center: state.center,
  zoom: state.zoom,
  customDistanceMarker: state.customDistanceMarker,
  mapMarkerStart: state.mapMarkerStart,
  mapMarkerEnd: state.mapMarkerEnd,
  liveTrailUsers: state.liveTrailUsers,
  showLiveTrailUsers: state.showLiveTrailUsers,
  shouldShowContextMenuStatus: state.shouldShowContextMenuStatus,

  //needed to trigger state changes
  filters: state.filters,
});

function shouldDisplayCustomPath(customPath: any): boolean {
  return Object.keys(customPath).length && customPath.path;
}

export default connect(mapStateToProps)(MapComponent);
