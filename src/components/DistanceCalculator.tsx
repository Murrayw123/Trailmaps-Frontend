import React, { Component } from "react";
import { Select } from "antd";

interface Props {
  dataSource;
  onSelect;
  type;
  value;
  mode;
  placeHolder;
  inputDirty;
  markerType;
}

class DistanceCalculator extends Component<Props, never> {
  filterOption = (inputValue: string, option): boolean => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  render(): JSX.Element {
    const {
      dataSource,
      onSelect,
      type,
      value,
      inputDirty,
      markerType,
      mode,
      placeHolder,
    } = this.props;
    const options = dataSource.map((poi) => ({
      label: poi.marker_title,
      value: poi.id,
    }));
    return (
      <>
        <Select
          showSearch
          mode={mode}
          style={{ width: 200 }}
          className={"distance-select"}
          onInputKeyDown={inputDirty}
          placeholder={placeHolder}
          filterOption={this.filterOption}
          onSelect={(e) => {
            onSelect(e, type, markerType);
          }}
          value={value ? value.marker_title : null}
          options={options}
        />
      </>
    );
  }
}

export default DistanceCalculator;
