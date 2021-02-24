import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  openDistanceTab,
  setEndPoint,
  setStartPoint,
  wipeEndMarker,
  wipeStartMarker,
} from "../redux/actions";
import { findIcon } from "../helpers/iconsData";
import { MapboxMarker } from "./MapboxComponents/MapboxMarker";

export class PoiMarker extends Component {
  markerClick = (point) => {
    let marker = _.cloneDeep(this.props.marker);
    if (!this.props.openKeys.includes("distanceTab")) {
      this.props.openDistanceTab();
    }
    if (point === "startPoint") {
      this.props.wipeMarkerStart();
      this.props.setStartPoint(marker);
    } else {
      this.props.wipeMarkerEnd();
      this.props.setEndPoint(marker);
    }
  };

  switchIcon = (marker) => {
    if (this.isStartOrEndMarker(marker)) {
      return findIcon("selected");
    } else {
      return findIcon(marker.marker_type);
    }
  };

  isStartOrEndMarker = (marker) => {
    return this.props.startPoint === marker || this.props.endPoint === marker;
  };

  render() {
    const { marker } = this.props;
    const icon = this.switchIcon(marker);
    return (
      <>
        <MapboxMarker
          key={marker.id}
          position={[marker.marker_lng, marker.marker_lat]}
          marker={marker}
          icon={icon}
          onClick={() => {
            this.props.onClick(marker);
          }}
          hasPopup={!this.isStartOrEndMarker(marker)}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setStartPoint: (marker) => {
    dispatch(setStartPoint(marker));
  },
  setEndPoint: (marker) => {
    dispatch(setEndPoint(marker));
  },
  openDistanceTab: (e) => {
    dispatch(openDistanceTab(e));
  },
  wipeMarkerStart: () => {
    dispatch(wipeStartMarker());
  },
  wipeMarkerEnd: () => {
    dispatch(wipeEndMarker());
  },
});

const mapStateToProps = (state) => ({
  startPoint: state.startPoint,
  endPoint: state.endPoint,
  openKeys: state.openKeys,
});

export default connect(mapStateToProps, mapDispatchToProps)(PoiMarker);
