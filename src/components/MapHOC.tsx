import React, { Component, ReactElement } from "react";
import {
  contextMenuStatus,
  customPath,
  liveTrailUsers,
  mapMarkerFinish,
  mapMarkerStart,
  poiMarkers,
} from "./MapSubComponents";
import { Context, ServicesContext } from "helpers/ServiceInit";
import { MapData } from "Interfaces/MapData";
import { GlobalState } from "Interfaces/GlobalState";
import { MapboxMap } from "components/MapboxComponents/MapboxMap";
import { FINISH, START } from "services/MarkerAdd";
import mapboxgl from "mapbox-gl";
import CustomDistanceMarker from "components/CustomDistanceMarker";
import { connect } from "react-redux";

interface Props {
  data: MapData;
  center: GlobalState["center"];
  zoom: GlobalState["zoom"];
  customPath: GlobalState["customPath"];
  showLiveTrailUsers: GlobalState["showLiveTrailUsers"];
  liveTrailUsers: GlobalState["liveTrailUsers"];
  shouldShowContextMenuStatus: GlobalState["shouldShowContextMenuStatus"];
  mapMarkerStart: GlobalState["mapMarkerStart"];
  mapMarkerFinish: GlobalState["mapMarkerFinish"];
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

  rightClick = (event: mapboxgl.MapMouseEvent) => {
    this.setState({
      rightClickXCoord: event.point.x,
      rightClickYCoord: event.point.y,
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
    this.context.markerAdd.draggableMarker(event, START);
  };

  draggableMarkerFinish = (event: mapboxgl.MapMouseEvent): void => {
    this.context.markerAdd.draggableMarker(event, FINISH);
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

  mapMarkerFinish = (): ReactElement => {
    if (this.props.mapMarkerFinish) {
      return mapMarkerFinish(this.props.mapMarkerFinish, (e) => {
        this.draggableMarkerFinish(e);
      });
    } else {
      return null;
    }
  };

  render() {
    return (
      <>
        <MapboxMap
          onClick={this.checkMarkers}
          onContextMenu={this.rightClick}
        />
        {this.poiMarkers()}
        {this.mapMarkerStart()}
        {this.mapMarkerFinish()}
        {this.customPath()}
        {this.contextMenuStatus()}
        <CustomDistanceMarker />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  customPath: state.customPath,
  data: state.data,
  center: state.center,
  zoom: state.zoom,
  mapMarkerStart: state.mapMarkerStart,
  mapMarkerFinish: state.mapMarkerFinish,
  liveTrailUsers: state.liveTrailUsers,
  showLiveTrailUsers: state.showLiveTrailUsers,
  shouldShowContextMenuStatus: state.shouldShowContextMenuStatus,

  //needed to trigger state changes
  filters: state.filters,
});

export default connect(mapStateToProps)(MapHOC);
