import React, { Component } from "react";
import { connect } from "react-redux";
import { setStartPoint, setEndPoint } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "antd";
import findIcon from "./helpers/iconsData";
import { Marker, Popup } from "react-leaflet";

export class PoiMarker extends Component {
  markerClick = point => {
    if (point === "startPoint") {
      this.props.setStartPoint(this.props.marker);
    } else {
      this.props.setEndPoint(this.props.marker);
    }
  };
  render() {
    const { marker } = this.props;
    let icon = findIcon(marker.marker_type);
    let info = marker.marker_info;

    return (
      <Marker
        key={marker.id}
        position={[marker.marker_lat, marker.marker_lng]}
        icon={icon}
        onClick={this.props.onClick}
      >
        <Popup>
          <div className="titleDiv">
            <h1 style={{ marginBottom: 0 }}>{marker.marker_title} </h1>
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
  }
});

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PoiMarker);
