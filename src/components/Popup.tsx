import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "antd";
import { Textfit } from "react-textfit";
import { GlobalState } from "Interfaces/GlobalState";
import { Marker } from "Interfaces/Marker";

interface Props {
  title: string;
  info: Marker["marker_info"];
  onClick: React.MouseEvent;
}

export class Popup extends Component<Props, never> {
  render(): JSX.Element {
    const { title, info, onClick } = this.props;

    return (
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
      </>
    );
  }
}
