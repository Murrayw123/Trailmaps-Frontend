import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'
import React, { Component } from 'react'
import * as turf from '@turf/turf'
import { connect } from 'react-redux'

class ElevationChart extends Component {
  calculateDistance = (linestring, previousDistance, counter) => {
    if (linestring[counter + 1]) {
      let distance = turf.distance(
        linestring[counter],
        linestring[counter + 1] ? linestring[counter + 1] : previousDistance
      )
      return previousDistance + distance
    }
  }

  findElevation = () => {
    let chartData = []
    if (this.props.customPath.path) {
      let linestring = this.props.customPath.path.geometry.coordinates
      linestring.map((element, counter) => {
        chartData.push({
          elevation: element[2],
          distance: this.calculateDistance(
            linestring,
            chartData[counter - 1] ? chartData[counter - 1].distance : 0,
            counter
          )
        })
      })
      return chartData
    } else {
      return []
    }
  }
  render() {
    let roundData = point => {
      return Math.round(point.distance)
    }
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={this.findElevation()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={roundData} />
          <YAxis allowDecimals={false} dataKey="elevation" />
          <Line type="monotone" dataKey="elevation" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

const mapStateToProps = state => ({
  customPath: state.customPath
})

export default connect(mapStateToProps)(ElevationChart)
