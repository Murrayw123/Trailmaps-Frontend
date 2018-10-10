import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, Divider, Switch } from 'antd'
import DistanceCalculator from './DistanceCalculator'

const FormItem = Form.Item

class NormalLoginForm extends React.Component {
  state = { start: '', end: '' }

  dataSource = () => {
    const dataSource = []
    this.props.poiMarkers.map(el => {
      dataSource.push({ value: el.marker_title, text: el.marker_title })
    })
    return dataSource
  }
  onSearchChange = (event, startOrFinish) => {
    this.setState({ [startOrFinish]: event })
  }

  onChange = checked => {
    console.log(`switch to ${checked}`)
  }

  validateFields = (rule, value, callback) => {
    const form = this.props.form.start
    const validPoints = []
    this.props.poiMarkers.map(el => {
      validPoints.push(el.marker_title)
    })
    if (validPoints.includes(this.state[rule.field])) {
      console.log('Valid Search')
    } else {
      this.props.form.setFields({
        [rule.field]: {
          value: 'Nooooooooo',
          errors: [new Error('Not a valid selection')]
        }
      })
    }
    callback()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err)
      } else {
        console.log('no Error')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const dataSource = this.dataSource()
    return (
      <div style={{ marginLeft: 48 }}>
        <Form
          onSubmit={this.handleSubmit}
          className="login-form"
          style={{ marginBottom: 0 }}
        >
          <FormItem id="start" style={{ marginBottom: 0 }} required={true}>
            {getFieldDecorator('start', {
              rules: [
                {
                  validator: this.validateFields
                }
              ]
            })(
              <DistanceCalculator
                placeHolder={'Start point'}
                dataSelect={this.onSearchChange}
                startOrFinish={'start'}
                dataSource={dataSource}
              />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: 0 }}>
            {getFieldDecorator('end', {
              rules: [
                {
                  validator: this.validateFields
                }
              ]
            })(
              <DistanceCalculator
                placeHolder={'End point'}
                dataSelect={this.onSearchChange}
                startOrFinish={'end'}
                dataSource={dataSource}
              />
            )}
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

const mapStateToProps = state => ({
  data: state.data,
  poiMarkers: state.poiMarkers
})

export default connect(mapStateToProps)(WrappedNormalLoginForm)
