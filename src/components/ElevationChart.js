import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { Component } from "react";
import { setCustomDistanceMarker } from "../redux/actions";
import { connect } from "react-redux";

class ElevationChart extends Component {
  drawMarker = (event) => {
    if (event.activePayload)
      this.props.dispatch(
        setCustomDistanceMarker(event.activePayload[0].payload.coords)
      );
  };

  wipeMarker = () => {
    this.props.dispatch(setCustomDistanceMarker([]));
  };

  render() {
    let roundData = (point) => {
      return point.distance.toFixed(1);
    };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={this.props.customPath.elevationChartData}
          margin={{ top: 5, right: 20, left: 5, bottom: 12 }}
          onMouseMove={(e) => this.drawMarker(e)}
          onMouseLeave={this.wipeMarker}
        >
          <XAxis dataKey={roundData}>
            <Label
              value="Distance (km)"
              offset={-6}
              position="insideBottom"
              className="x-axis"
            />
          </XAxis>
          <Tooltip
            labelFormatter={(name) => "distance: " + name + "km"}
            formatter={(value) => value + "m"}
          />
          <YAxis allowDecimals={false} dataKey="elevation">
            <Label
              value="Elevation (meters)"
              angle={-90}
              position="insideLeft"
              offset={10}
              dy={60}
              style={{ color: "red" }}
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
    );
  }
}

const mapStateToProps = (state) => ({
  customPath: state.customPath,
});

export default connect(mapStateToProps)(ElevationChart);
