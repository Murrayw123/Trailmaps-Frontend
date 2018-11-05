import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, Divider, Switch } from 'antd'
import DistanceCalculator from './DistanceCalculator'

const FormItem = Form.Item

class NormalLoginForm extends React.Component {
  onChange = checked => {
    console.log(`switch to ${checked}`)
  }

  handleSubmit = e => {}

  render() {
    console.log(this.props.customDistance)
    const {
      dataSource,
      dataSelect,
      buttonDisabled,
      inputOnChange,
      inputDirty,
      submitDistance
    } = this.props
    return (
      <div style={{ marginLeft: 48 }}>
        <Form
          onSubmit={this.handleSubmit}
          className="login-form"
          style={{ marginBottom: 0 }}
        >
          <FormItem id="start" style={{ marginBottom: 0 }} required={true}>
            <DistanceCalculator
              placeHolder={'Start point'}
              dataSelect={dataSelect}
              type={'start'}
              dataSource={dataSource}
              inputOnChange={inputOnChange}
            />
          </FormItem>
          <FormItem style={{ marginBottom: 0 }}>
            <DistanceCalculator
              placeHolder={'End point'}
              dataSelect={dataSelect}
              type={'end'}
              dataSource={dataSource}
              inputOnChange={inputOnChange}
              inputDirty={inputDirty}
            />
          </FormItem>
          <FormItem style={{ marginBottom: 0 }}>
            {this.props.customDistance}
          </FormItem>
          <FormItem style={{ marginBottom: 0, paddingTop: 10 }}>
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
          </FormItem>
        </Form>
        {/* <div style={{ paddingTop: 10 }}>
          Enable clickable start/end points
          <Switch
            style={{ marginLeft: 10, marginBottom: 1 }}
            size="small"
            defaultChecked
            onChange={this.onChange}
          />
        </div> */}
        <div style={{ display: 'flex' }} />
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

const mapStateToProps = state => ({
  data: state.data,
  poiMarkers: state.poiMarkers,
  customDistance: state.customDistance
})

export default connect(mapStateToProps)(WrappedNormalLoginForm)
