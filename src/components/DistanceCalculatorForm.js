import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Divider,
  Switch,
  Card
} from 'antd'
import DistanceCalculator from './DistanceCalculator'

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
      customPath
    } = this.props
    return (
      <div style={{ marginLeft: 48 }}>
        <div>
          <DistanceCalculator
            placeHolder={'Start point'}
            onSelect={dataSelect}
            type={'start'}
            dataSource={dataSource}
            value={startPoint}
            className="distance-calculator"
          />
          <DistanceCalculator
            placeHolder={'End point'}
            onSelect={dataSelect}
            type={'end'}
            dataSource={dataSource}
            value={endPoint}
          />
          {this.props.customDistance}
          <Button
            disabled={buttonDisabled}
            icon="calculator"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={submitDistance}
          >
            Calculate
          </Button>
          {customPath.path ? (
            <Button
              icon="delete"
              type="default"
              htmlType="submit"
              className="clear-path"
              onClick={clearPath}
            >
              Clear
            </Button>
          ) : null}
        </div>
        {/* <Divider style={{ margin: 0, padding: 0 }} /> */}
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  startPoint: state.startPoint,
  endPoint: state.endPoint,
  customPath: state.customPath
})

export default connect(mapStateToProps)(DistanceCalculatorForm)
