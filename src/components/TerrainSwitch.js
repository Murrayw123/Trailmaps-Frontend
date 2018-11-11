import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStyles } from '../config'
import { Select } from 'antd'

const Option = Select.Option

export class TerrainSwitch extends Component {
  render() {
    const { terrain, terrainSwitch } = this.props
    return (
      <div>
        <Select
          style={{ width: 200 }}
          onChange={terrainSwitch}
          defaultValue={terrain}
          placeholder={terrain.pretty}
        >
          {mapStyles.map(layer => {
            return <Option key={layer.key}> {layer.pretty} </Option>
          })}
        </Select>
      </div>
    )
  }
}
