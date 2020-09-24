import React, { Component } from "react";
import { Rnd as ElevationChartWrapper } from "react-rnd";
import ElevationChart from "components/ElevationChart";
import { Button, Icon } from "antd";
import _ from "lodash";
import { connect } from "react-redux";

interface Props {
  customPath: any;
}

interface State {
  width: string;
  height: number | string;
  showElevation: boolean;
}

class ElevationChartComponent extends Component<Props, State> {
  state = { width: "40%", height: 125, showElevation: true };

  elevationChartStatus = (state): void => {
    this.setState({ showElevation: state });
  };

  onResize = (ref: any, position: any): void => {
    this.setState({
      showElevation: this.state.showElevation,
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    });
  };

  render() {
    const { customPath } = this.props;
    const { showElevation } = this.state;

    return (
      <div>
        {shouldShowElevationChart(customPath, showElevation) ? (
          <ElevationChartWrapper
            className="elevation-chart"
            size={{ width: this.state.width, height: this.state.height }}
            onResize={(e, direction, ref, delta, position) => {
              this.onResize(ref, position);
            }}
          >
            <ElevationChart />
            <Icon
              className="minimise-chart"
              type="down-circle"
              onClick={() => {
                this.elevationChartStatus(false);
              }}
            />
          </ElevationChartWrapper>
        ) : ElevationMinimised(customPath, this.state.showElevation) ? (
          <Button
            href={null}
            className="show-elevation"
            type="primary"
            size="small"
            onClick={() => {
              this.elevationChartStatus(true);
            }}
          >
            <span>
              Show Elevation
              <Icon className="minimise-chart" type="up-circle" />
            </span>
          </Button>
        ) : null}
      </div>
    );
  }
}

const shouldShowElevationChart = (
  customPath: any,
  showElevation: boolean
): boolean => {
  return !_.isEmpty(customPath) && showElevation && customPath.distance > 0;
};

const ElevationMinimised = (customPath: any, showElevation): boolean => {
  return !_.isEmpty(customPath) && customPath.distance > 0 && !showElevation;
};

const mapStateToProps = (state) => ({
  customPath: state.customPath,
});

export const ElevationChartHOC = connect(mapStateToProps)(
  ElevationChartComponent
);
