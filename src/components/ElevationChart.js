import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  ResponsiveContainer
} from 'recharts'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class ElevationChart extends Component {
  render() {
    let roundData = point => {
      return Math.round(point.distance)
    }
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={this.props.customPath.elevationChartData}
          margin={{ top: 5, right: 15, left: 5, bottom: 12 }}
        >
          <XAxis dataKey={roundData}>
            <Label
              value="Distance (km)"
              offset={-6}
              position="insideBottom"
              className="x-axis"
            />
          </XAxis>
          <YAxis allowDecimals={false} dataKey="elevation">
            <Label
              value="Elevation (meters)"
              angle={-90}
              position="insideLeft"
              offset={10}
              dy={60}
              style={{ color: 'red' }}
              className="y-axis"
            />
          </YAxis>
          <Line
            dot={false}
            type="monotone"
            dataKey="elevation"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

const mapStateToProps = state => ({
  customPath: state.customPath
})

export default connect(mapStateToProps)(ElevationChart)
