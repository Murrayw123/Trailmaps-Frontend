import React, { Component, ReactElement } from "react";
import { connect } from "react-redux";
import "leaflet/dist/leaflet.css";
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
import { MapboxMap } from "components/MapboxComponents/MapboxMap";
import { END, START } from "services/MarkerAdd";
import mapboxgl from "mapbox-gl";
import { Marker } from "react-mapbox-gl";
import { MapboxMarker } from "components/MapboxComponents/Marker";

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

function displayCustomPath(customPath: any): boolean {
  return Object.keys(customPath).length && customPath.path;
}

class MapHOC extends Component<Props, State> {
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

  onMarkerClick = (marker: mapboxgl.MapMouseEvent): void => {
    this.context.markerAdd.onMarkerClick(marker);
  };

  checkMarkers = (event: mapboxgl.MapMouseEvent): void => {
    this.context.markerAdd.checkMarkers(event);
  };

  draggableMarkerStart = (event: mapboxgl.MapMouseEvent): void => {
    this.context.markerAdd.createDraggableMarker(event, START);
  };

  draggableMarkerEnd = (event: mapboxgl.MapMouseEvent): void => {
    this.context.markerAdd.createDraggableMarker(event, END);
  };

  customPath = (): ReactElement => {
    if (displayCustomPath(this.props.customPath)) {
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
      <>
        <MapboxMap onClick={this.checkMarkers} />
        <MapboxMarker key={1} icon={""} position={[115.8605, -31.9505]} />
      </>
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

export default connect(mapStateToProps)(MapHOC);
