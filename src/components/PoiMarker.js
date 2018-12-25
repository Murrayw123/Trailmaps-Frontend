import React, { Component } from "react";
import { connect } from "react-redux";
import { setStartPoint, setEndPoint, openDistanceTab } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "antd";
import { findIcon, selected } from "./helpers/iconsData";
import { Marker, Popup } from "react-leaflet";
import ScaleText from "react-scale-text";

export class PoiMarker extends Component {
  markerClick = point => {
    this.props.openDistanceTab();
    if (point === "startPoint") {
      this.props.setStartPoint(this.props.marker);
    } else {
      this.props.setEndPoint(this.props.marker);
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
            <div style={{ width: 120 }} className="title-parent">
              <ScaleText>
                <p> {title} </p>
              </ScaleText>
            </div>
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
  setStartPoint: e => {
    dispatch(setStartPoint(e));
  },
  setEndPoint: e => {
    dispatch(setEndPoint(e));
  },
  openDistanceTab: e => {
    dispatch(openDistanceTab(e));
  }
});

const mapStateToProps = state => ({
  startPoint: state.startPoint,
  endPoint: state.endPoint
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PoiMarker);
