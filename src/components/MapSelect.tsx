import React, { Component } from "react";
import { connect } from "react-redux";
import { Cascader } from "antd";
import { GlobalState } from "Interfaces/GlobalState";
import { capitalize } from "lodash";

interface Props {
  allMaps: GlobalState["allMaps"];
  mapData: GlobalState["mapData"];
}

const WALKING = "walking";
const CYCLING = "cycling";
const BOTH = "both";

export class MapSelect extends Component<Props, never> {
  onMapSelect = (value) => {
    window.location.href = "/maps/" + value[1];
  };

  buildChildren = (type: string): Array<{ value: string; label: string }> => {
    const children = [];
    this.props.allMaps.forEach((map) => {
      if (map.type === type || map.type === BOTH) {
        children.push({ value: map.alias, label: map.name });
      }
    });
    return children;
  };

  buildPlaceHolder = (): string => {
    return this.props.mapData.name
      ? this.props.mapData.name +
          " | " +
          this.props.mapData.type.charAt(0).toUpperCase() +
          this.props.mapData.type.slice(1)
      : "Please Select";
  };

  render() {
    const options = [
      {
        value: CYCLING,
        label: capitalize(CYCLING),
        children: this.buildChildren(CYCLING),
      },
      {
        value: WALKING,
        label: capitalize(WALKING),
        children: this.buildChildren(WALKING),
      },
    ];
    return (
      <Cascader
        options={options}
        className={"map-select"}
        onChange={this.onMapSelect}
        placeholder={this.buildPlaceHolder()}
        size={"large"}
        getPopupContainer={() =>
          document.getElementsByClassName(
            (this.props as any).parentNode
          )[0] as any
        }
      />
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  mapData: state.mapData,
  allMaps: state.allMaps,
});

export default connect(mapStateToProps)(MapSelect);
