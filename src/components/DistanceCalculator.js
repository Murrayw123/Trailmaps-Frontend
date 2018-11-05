import React, { Component } from 'react'
import { Select } from 'antd'
const Option = Select.Option

class DistanceCalculator extends Component {
  render() {
    const {
      dataSource,
      dataSelect,
      type,
      inputOnChange,
      inputDirty
    } = this.props
    const options = dataSource.map(poi => (
      <Option key={poi.marker_id}>{poi.marker_title}</Option>
    ))
    return (
      <div>
        <Select
          showSearch
          style={{ width: 250 }}
          onInputKeyDown={inputDirty}
          placeholder={this.props.placeHolder}
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={e => {
            dataSelect(e, type)
          }}
        >
          {options}
        </Select>
      </div>
    )
  }
}

export default DistanceCalculator
