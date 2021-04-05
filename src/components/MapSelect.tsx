import React, { Component } from "react";
import { connect } from "react-redux";
import { Cascader } from "antd";
import { GlobalState } from "Interfaces/GlobalState";

interface Props {
  allMaps: GlobalState["allMaps"];
  mapData: GlobalState["mapData"];
}

export class MapSelect extends Component<Props, never> {
  onMapSelect = (value) => {
    window.location.href = "/maps/" + value[1];
  };

  buildChildren = (type) => {
    const children = [];
    this.props.allMaps.map((map) => {
      if (map[type]) {
        children.push({ value: map.alias, label: map.name });
      }
    });
    return children;
  };

  buildPlaceHolder = (): string => {
    return this.props.mapData
      ? this.props.mapData.name +
          " | " +
          this.props.mapData.type.charAt(0).toUpperCase() +
          this.props.mapData.type.slice(1)
      : "Please Select";
  };

  render() {
    const options = [
      {
        value: "cycling",
        label: "Cycling",
        children: this.buildChildren("cycling"),
      },
      {
        value: "walking",
        label: "Bushwalking",
        children: this.buildChildren("walking"),
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

const mapStateToProps = (state) => ({
  data: state.data,
  allMaps: state.allMaps,
});

export default connect(mapStateToProps)(MapSelect);
