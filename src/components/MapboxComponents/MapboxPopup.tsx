import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "antd";
import { Textfit } from "react-textfit";

import ReactDOM from "react-dom";
import { Marker } from "Interfaces/Marker";
import { Context, ServicesContext } from "helpers/ServiceInit";
import mapboxgl from "mapbox-gl";

interface Props {
  poiMarker: Marker;
  lng: number;
  lat: number;
}

export class MapboxPopup extends Component<Props, never> {
  public context: Context;
  static contextType = ServicesContext;

  componentDidMount(): void {
    const { poiMarker, lng, lat } = this.props;
    const info = poiMarker.marker_info;
    const title = poiMarker.marker_title;
    const placeholder = document.createElement("div");

    ReactDOM.render(
      <>
        <div className="titleDiv">
          <Textfit style={{ width: 120, height: 30 }} className="title-parent">
            <h1> {title} </h1>
          </Textfit>
          <div className="titleSpan">
            <a>
              <FontAwesomeIcon
                icon={faFlag}
                className="startFlag"
                // onClick={() => {
                //   this.markerClick("startPoint");
                // }}
              />
            </a>
            <a>
              <FontAwesomeIcon
                icon={faFlagCheckered}
                className="startFlag"
                // onClick={() => {
                //   this.markerClick("endPoint");
                // }}
              />
            </a>
          </div>
        </div>
        <Divider style={{ marginTop: 0, marginBottom: 5 }} />
        <div className="popupText">
          {info.map((el, count) => {
            return (
              <div key={count}>
                <b> {el.title}: </b> {el.value}
              </div>
            );
          })}
        </div>
      </>,
      placeholder
    );

    new mapboxgl.Popup({ offset: 25 })
      .setDOMContent(placeholder)
      .setLngLat({ lng: lng, lat: lat })
      .addTo(this.context.mapBoxMapService.map);
  }

  render(): JSX.Element {
    return null;
  }
}
