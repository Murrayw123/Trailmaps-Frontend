import React, { Component } from "react";
import { Select } from "antd";
const Option = Select.Option;

class DistanceCalculator extends Component {
  render() {
    const {
      dataSource,
      onSelect,
      type,
      value,
      inputDirty,
      markerType,
    } = this.props;
    const options = dataSource.map((poi) => (
      <Option key={poi.id}>{poi.marker_title}</Option>
    ));
    return (
      <>
        <Select
          showSearch
          mode={this.props.mode}
          style={{ width: 200 }}
          className={"distance-select"}
          onInputKeyDown={inputDirty}
          placeholder={this.props.placeHolder}
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={(e) => {
            onSelect(e, type, markerType);
          }}
          value={value ? value.marker_title : null}
        >
          {options}
        </Select>
      </>
    );
  }
}

export default DistanceCalculator;
