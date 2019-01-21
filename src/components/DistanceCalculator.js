import React, { Component } from 'react'
import { Select } from 'antd'
const Option = Select.Option

class DistanceCalculator extends Component {
  render() {
    const { dataSource, onSelect, type, value, inputDirty } = this.props
    const options = dataSource.map(poi => (
      <Option key={poi.marker_id}>{poi.marker_title}</Option>
    ));
    return (
      <div>
        <Select
          showSearch
          mode={this.props.mode}
          style={{ width: 200, marginBottom: 10 }}
          onInputKeyDown={inputDirty}
          placeholder={this.props.placeHolder}
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={e => {
            onSelect(e, type)
          }}
          value={value ? value.marker_title : null}
        >
          {options}
        </Select>
      </div>
    )
  }
}

export default DistanceCalculator
