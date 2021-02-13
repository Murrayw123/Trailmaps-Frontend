import React from "react";
import {connect} from "react-redux";
import {Button, Card, Divider, Switch, Tooltip} from "antd";
import DistanceCalculator from "./DistanceCalculator";
import {CalculatorOutlined, DeleteOutlined, QuestionCircleOutlined,} from "@ant-design/icons";

class DistanceCalculatorForm extends React.Component {
  render() {
    const {
      dataSource,
      dataSelect,
      buttonDisabled,
      submitDistance,
      startPoint,
      endPoint,
      clearPath,
      customPath,
    } = this.props;
    return (
      <>
        <DistanceCalculator
          placeHolder={"Start point"}
          onSelect={dataSelect}
          type={"start"}
          dataSource={dataSource}
          value={startPoint}
          className="distance-calculator"
          markerType="distance"
        />
        <DistanceCalculator
          placeHolder={"End point"}
          onSelect={dataSelect}
          type={"end"}
          dataSource={dataSource}
          value={endPoint}
          markerType="distance"
        />
        {this.props.customDistance}
        <Button
          disabled={buttonDisabled}
          icon={<CalculatorOutlined />}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={submitDistance}
        >
          Calculate
        </Button>
        {customPath.path ? (
          <Button
            icon={<DeleteOutlined />}
            type="default"
            htmlType="submit"
            className="clear-path"
            onClick={clearPath}
          >
            Clear
          </Button>
        ) : null}
        <Divider className="distance-divider" />
        <Card bordered={false} style={{ width: 250 }}>
          <span>
            Custom Path Creation
            <Tooltip title="Click on the map to define a custom start and end point ">
              <QuestionCircleOutlined style={{ paddingLeft: 4, fontSize: 12 }} />
            </Tooltip>
            <Switch
              size="small"
              style={{ marginLeft: 5 }}
              checked={this.props.allowCustomPath}
              onChange={this.props.toggleCustomPath}
            />
          </span>
        </Card>
        <Divider style={{ marginTop: 0 }} className="distance-divider" />
        {customPath.path ? (
          <Card bordered={false} style={{ width: 250 }}>
            <p>
              <b> Distance: </b>
              {customPath.distance.toFixed(2)}km
            </p>
            <p>
              <b>Elevation Gain: </b>
              {Math.round(customPath.elevationGain)}m
            </p>
            <p>
              <b>Elevation Loss: </b> {Math.round(customPath.elevationLoss)}m
            </p>
          </Card>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  startPoint: state.startPoint,
  endPoint: state.endPoint,
  customPath: state.customPath,
  allowCustomPath: state.allowCustomPath,
});

export default connect(mapStateToProps)(DistanceCalculatorForm);
