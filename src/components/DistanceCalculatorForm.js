import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, Divider, Switch } from 'antd'
import DistanceCalculator from './DistanceCalculator'

class DistanceCalculatorForm extends React.Component {
  render() {
    const {
      dataSource,
      dataSelect,
      buttonDisabled,
      submitDistance,
      startPoint,
      endPoint
    } = this.props
    return (
      <div style={{ marginLeft: 48 }}>
        <DistanceCalculator
          placeHolder={'Start point'}
          onSelect={dataSelect}
          type={'start'}
          dataSource={dataSource}
          value={startPoint}
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
        <div style={{ display: 'flex' }} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  startPoint: state.startPoint,
  endPoint: state.endPoint
})

export default connect(mapStateToProps)(DistanceCalculatorForm)
