import React, { Component } from 'react'
import { Checkbox } from 'antd'

export default class DistanceCalculator extends Component {
  render() {
    const CheckboxGroup = Checkbox.Group
    const plainOptions = ['Some Long Option', 'Another Longer Option', 'Short']

    function onChange(checkedValues) {
      console.log('checked = ', checkedValues)
    }

    return (
      <CheckboxGroup
        style={this.props.style}
        options={plainOptions}
        defaultValue={['Apple']}
        onChange={onChange}
      />
    )
  }
}
