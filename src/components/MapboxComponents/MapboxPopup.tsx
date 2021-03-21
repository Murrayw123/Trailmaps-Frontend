import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "antd";
import { Marker } from "Interfaces/Marker";
import "components/MapboxComponents/Popup.css";

interface Props {
  title: string;
  info: Marker["marker_info"];
  onClick: any;
}

const titleSize = (titleLength: number): number => {
  if (titleLength < 8) {
    return 24;
  }
  if (titleLength > 8 && titleLength < 12) {
    return 20;
  }
  if (titleLength > 12) {
    return 14;
  }
  return 14;
};

export class MapboxPopup extends Component<Props, never> {
  render(): JSX.Element {
    const { title, info, onClick } = this.props;

    return (
      <>
        <div className="titleDiv">
          <h1 style={{ fontSize: titleSize(title.length) }}> {title} </h1>
          <div className="titleSpan">
            <a
              onClick={() => {
                onClick("startPoint");
              }}
            >
              <FontAwesomeIcon icon={faFlag} className="flag startFlag" />
            </a>
            <a
              onClick={() => {
                return onClick("endPoint");
              }}
            >
              <FontAwesomeIcon
                icon={faFlagCheckered}
                className="flag endFlag"
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
      </>
    );
  }
}
