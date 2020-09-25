import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  setStartPoint,
  setEndPoint,
  openDistanceTab,
  wipeStartMarker,
  wipeEndMarker
} from "redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "antd";
import { findIcon, selected } from "../helpers/iconsData";
import { Marker, Popup } from "react-leaflet";
import { Textfit } from "react-textfit";

export class PoiMarker extends Component {
  markerClick = point => {
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

  switchIcon = marker => {
    if (this.props.startPoint === marker || this.props.endPoint === marker) {
      return selected;
    } else {
      return findIcon(marker.marker_type);
    }
  };
  render() {
    const { marker } = this.props;
    const icon = this.switchIcon(marker);
    const info = marker.marker_info;
    const title = marker.marker_title;
    return (
      <Marker
        key={marker.id}
        position={[marker.marker_lat, marker.marker_lng]}
        icon={icon}
        onClick={() => {
          this.props.onClick(marker);
        }}
      >
        <Popup>
          <div className="titleDiv">
            <Textfit
              style={{ width: 120, height: 30 }}
              className="title-parent"
            >
              <h1> {title} </h1>
            </Textfit>
            <div className="titleSpan">
              <a>
                <FontAwesomeIcon
                  icon={faFlag}
                  className="startFlag"
                  onClick={() => {
                    this.markerClick("startPoint");
                  }}
                />
              </a>
              <a>
                <FontAwesomeIcon
                  icon={faFlagCheckered}
                  className="startFlag"
                  onClick={() => {
                    this.markerClick("endPoint");
                  }}
                />
              </a>
            </div>
          </div>
          <Divider style={{ marginTop: 0, marginBottom: 5 }} />
          <div className="popupText">
            {info.map(el => {
              return (
                <div>
                  <b> {el.title}: </b> {el.value}
                </div>
              );
            })}
          </div>
        </Popup>
      </Marker>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setStartPoint: marker => {
    dispatch(setStartPoint(marker));
  },
  setEndPoint: marker => {
    dispatch(setEndPoint(marker));
  },
  openDistanceTab: e => {
    dispatch(openDistanceTab(e));
  },
  wipeMarkerStart: () => {
    dispatch(wipeStartMarker());
  },
  wipeMarkerEnd: () => {
    dispatch(wipeEndMarker());
  }
});

const mapStateToProps = state => ({
  startPoint: state.startPoint,
  endPoint: state.endPoint,
  openKeys: state.openKeys
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PoiMarker);
