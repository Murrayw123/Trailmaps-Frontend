import React, { Component } from "react";
import { Checkbox } from "antd";
const CheckboxGroup = Checkbox.Group;

export default class Filters extends Component {
  render() {
    const mapMarkerTypes = this.props.mapMarkerTypes;
    return (
      <CheckboxGroup
        style={this.props.style}
        options={mapMarkerTypes}
        onChange={this.props.filterMarkers}
        defaultValue={this.props.currentFilters}
      />
    );
  }
}
