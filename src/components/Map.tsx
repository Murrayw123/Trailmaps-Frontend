import React, { Component, ReactElement } from "react";
import { connect } from "react-redux";
import "leaflet/dist/leaflet.css";
import { GeoJSON, Map as LMap, TileLayer, ZoomControl } from "react-leaflet";
import { END, START } from "services/MarkerAdd";
import {
  contextMenuStatus,
  customDistanceMarkerComponent,
  customPath,
  liveTrailUsers,
  mapMarkerEnd,
  mapMarkerStart,
  poiMarkers,
} from "./MapSubComponents";
import { Context, ServicesContext } from "helpers/ServiceInit";
import { MapData } from "Interfaces/MapData";
import { GlobalState } from "Interfaces/GlobalState";

interface Props {
  data: MapData;
  center: GlobalState["center"];
  zoom: GlobalState["zoom"];
  customPath: GlobalState["customPath"];
  showLiveTrailUsers: GlobalState["showLiveTrailUsers"];
  liveTrailUsers: GlobalState["liveTrailUsers"];
  shouldShowContextMenuStatus: GlobalState["shouldShowContextMenuStatus"];
  mapMarkerStart: GlobalState["mapMarkerStart"];
  mapMarkerEnd: GlobalState["mapMarkerEnd"];
  customDistanceMarker: GlobalState["customDistanceMarker"];
}

interface State {
  rightClickXCoord: number;
  rightClickYCoord: number;
}

const imageryUrl =
  "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg70?access_token=pk.eyJ1IjoibXVycmF5dzEyMyIsImEiOiJja2tkZm94OXYwOXRyMndtaXo1bjdlN3YzIn0.JSOACtJHoSLIL3yswen8-A";

class Map extends Component<Props, State> {
  public context: Context;
  static contextType = ServicesContext;

  state = { rightClickXCoord: 0, rightClickYCoord: 0 };

  rightClick = (event) => {
    this.setState({
      rightClickXCoord: event.containerPoint.x,
      rightClickYCoord: event.containerPoint.y,
    });

    this.context.markerAdd.onMapRightClick(event);
  };

  onMarkerClick = (marker: React.MouseEvent<HTMLElement>): void => {
    this.context.markerAdd.onMarkerClick(marker);
  };

  checkMarkers = (event: React.MouseEvent<HTMLElement>): void => {
    this.context.markerAdd.checkMarkers(event);
  };

  draggableMarkerStart = (event: React.MouseEvent<HTMLElement>): void => {
    this.context.markerAdd.createDraggableMarker(event, START);
  };

  draggableMarkerEnd = (event: React.MouseEvent<HTMLElement>): void => {
    this.context.markerAdd.createDraggableMarker(event, END);
  };

  customPath = (): ReactElement => {
    if (shouldDisplayCustomPath(this.props.customPath)) {
      return customPath(this.props.customPath);
    } else {
      return null;
    }
  };

  poiMarkers = (): Array<ReactElement> => {
    return poiMarkers(this.context.markerAdd.markersInFilteredList, (e) =>
      this.onMarkerClick(e)
    );
  };

  liveTrailUsers = (): Array<ReactElement> => {
    if (this.props.showLiveTrailUsers) {
      return liveTrailUsers(this.props.liveTrailUsers, (e) =>
        this.onMarkerClick(e)
      );
    } else {
      return null;
    }
  };

  contextMenuStatus = (): ReactElement => {
    if (this.props.shouldShowContextMenuStatus) {
      return contextMenuStatus(
        this.state.rightClickXCoord,
        this.state.rightClickYCoord
      );
    } else {
      return null;
    }
  };

  mapMarkerStart = (): ReactElement => {
    if (this.props.mapMarkerStart) {
      return mapMarkerStart(this.props.mapMarkerStart, (e) => {
        this.draggableMarkerStart(e);
      });
    } else {
      return null;
    }
  };

  mapMarkerEnd = (): ReactElement => {
    if (this.props.mapMarkerEnd) {
      return mapMarkerEnd(this.props.mapMarkerEnd, (e) => {
        this.draggableMarkerEnd(e);
      });
    } else {
      return null;
    }
  };

  customDistanceMarker = (): ReactElement => {
    const { customDistanceMarker, data } = this.props;
    if (customDistanceMarker.length) {
      return customDistanceMarkerComponent(data.map_type, customDistanceMarker);
    } else {
      return null;
    }
  };

  render() {
    const { data, center, zoom } = this.props;
    return (
      <LMap
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
      </LMap>
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

export default connect(mapStateToProps)(Map);
