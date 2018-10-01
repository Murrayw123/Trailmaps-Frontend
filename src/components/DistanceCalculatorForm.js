import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Divider, Switch } from 'antd'
import DistanceCalculator from './DistanceCalculator'

const FormItem = Form.Item

class NormalLoginForm extends React.Component {
  onChange = checked => {
    console.log(`switch to ${checked}`)
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  onChange(checked) {
    console.log(`switch to ${checked}`)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{ marginLeft: 48 }}>
        <Form
          onSubmit={this.handleSubmit}
          className="login-form"
          style={{ marginBottom: 0 }}
        >
          <FormItem style={{ marginBottom: 0 }}>
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: 'Please input a valid start point' }
              ]
            })(<DistanceCalculator placeHolder={'Start point'} />)}
          </FormItem>
          <FormItem style={{ marginBottom: 0 }}>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input a valid end point' }
              ]
            })(<DistanceCalculator placeHolder={'End point'} />)}
          </FormItem>
          <FormItem style={{ marginBottom: 0, paddingTop: 10 }}>
            <Button
              icon="calculator"
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Calculate
            </Button>
          </FormItem>
        </Form>
        <div style={{ paddingTop: 10 }}>
          Enable clickable start/end points
          <Switch
            style={{ marginLeft: 10, marginBottom: 1 }}
            size="small"
            defaultChecked
            onChange={this.onChange}
          />
        </div>
        <div style={{ display: 'flex' }} />
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default WrappedNormalLoginForm
