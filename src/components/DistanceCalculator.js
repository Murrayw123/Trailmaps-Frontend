import React, { Component } from 'react'
import { AutoComplete } from 'antd'

class DistanceCalculator extends Component {
  render() {
    const { dataSource, dataSelect, startOrFinish } = this.props

    return (
      <div>
        <AutoComplete
          style={{ width: 250 }}
          dataSource={dataSource}
          placeholder={this.props.placeHolder}
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          onChange={e => {
            dataSelect(e, startOrFinish)
          }}
        />
      </div>
    )
  }
}

export default DistanceCalculator
