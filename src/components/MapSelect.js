import React, { Component } from "react";
import { connect } from "react-redux";
import { Cascader } from "antd";

export class MapSelect extends Component {
  onMapSelect = value => {
    window.location.href = "/maps/" + value[1];
  };

  buildChildren = type => {
    let children = [];
    this.props.allMaps.map(map => {
      if (map[type]) {
        children.push({ value: map.alias, label: map.map_name });
      }
    });
    return children;
  };
  render() {
    const options = [
      {
        value: "cycling",
        label: "Cycling",
        children: this.buildChildren("cycling")
      },
      {
        value: "walking",
        label: "Bushwalking",
        children: this.buildChildren("walking")
      }
    ];
    return (
      <Cascader
        options={options}
        className={"map-select"}
        onChange={this.onMapSelect}
        placeholder={
          this.props.data.map_name
            ? this.props.data.map_name +
              " | " +
              this.props.data.type.charAt(0).toUpperCase() +
              this.props.data.type.slice(1)
            : "Please Select"
        }
        size={"large"}
        getPopupContainer={() =>
          document.getElementsByClassName(this.props.parentNode)[0]
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  allMaps: state.allMaps
});

export default connect(mapStateToProps)(MapSelect);
