import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { InputNumber, Input, Modal, Select, Upload, message, Button, Tooltip } from "antd";
import React, { Component } from "react";
import { markerChoices } from "../helpers/iconsData";
import { shouldShowContextMenu, showMarkerAddModal } from "../redux/actions";
import { connect } from "react-redux";
import { URLPREFIX } from "../config";
import Icon from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

class CollectionCreateForm extends React.Component {
  render() {
      const { visible, onCancel, onCreate, form, lat, lng } = this.props;
      const { getFieldDecorator } = form;

    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };

    return (
      <Modal
        visible={visible}
        title="Add New Marker"
        okText="Submit for Approval"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Form.Item
            label={
              <span>
                Marker name
                <Tooltip title="A short name for the marker to appear on the map. Do not include any information about distance or elevation.">
                  <Icon className={"helper-icon"} type="question-circle" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("marker_title", {
              rules: [
                {
                  required: true,
                  message: "Please input the name of the marker",
                },
              ],
            })(<Input />)}
          </Form.Item>
          <span>
            <Form.Item style={{ display: "inline-block" }} label="Latitude">
              {getFieldDecorator("lat", {
                initialValue: lat.toFixed(5),
              })(<InputNumber style={{ width: 200 }} disabled={true} />)}
            </Form.Item>
            <Form.Item
              style={{ display: "inline-block", paddingLeft: 10 }}
              label="Longitude"
            >
              {getFieldDecorator("lng", {
                initialValue: lng.toFixed(5),
              })(<InputNumber style={{ width: 200 }} disabled={true} />)}
            </Form.Item>
          </span>
          <Form.Item
            label={
              <span>
                Type of marker
                <Tooltip title="Choose from one of the following options. Different icons appear for each type">
                  <Icon className={"helper-icon"} type="question-circle" />
                </Tooltip>
              </span>
            }
            hasFeedback
          >
            {getFieldDecorator("marker_type", {
              rules: [
                {
                  required: true,
                  message: "Please select the type of marker",
                },
              ],
            })(
              <Select
                showSearch
                dropdownClassName={"marker-type-dropdown"}
                placeholder="Type of marker"
              >
                {markerChoices.map((marker) => {
                  return <Option value={marker.id}> {marker.name} </Option>;
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Popup Information
                <Tooltip title="This information appears above the marker when it's clicked. Do not include any information about distance or elevation.">
                  <Icon className={"helper-icon"} type="question-circle" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("marker_info", {
              rules: [
                {
                  required: true,
                  message: "Marker popup information is required",
                },
              ],
            })(<TextArea rows={2} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Sidebar Description
                <Tooltip title="This information appears on the collapsible sidebar. Do not include any information about distance or elevation.">
                  <Icon className={"helper-icon"} type="question-circle" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("marker_blurb", {
              rules: [
                {
                  required: true,
                  message: "A short sidebar blurb is required",
                },
              ],
            })(<TextArea rows={3} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Image
                <Tooltip title="An image is not required but is handy!">
                  <Icon className={"helper-icon"} type="question-circle" />
                </Tooltip>
              </span>
            }
          >
            <div className="dropbox">
              {getFieldDecorator("default_image", {
                valuePropName: "fileList",
                getValueFromEvent: normFile,
              })(
                <Upload
                  {...this.props.imageProps}
                  name="file"
                  action="https://api.cloudinary.com/v1_1/dqlvslhyi/image/upload"
                >
                  <Button>
                    <Tooltip title="prompt text">
                      <Icon className={"helper-icon"} type="upload" /> Click to
                      upload
                    </Tooltip>
                  </Button>
                </Upload>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

class MarkerModal extends Component {
  state = {
    visible: true,
  };

  postNewMarker = async (formData) => {
    const settings = {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    };
    return await fetch(URLPREFIX + "/api/submit_marker", settings).then(
      (response) => {
        return response.status === 201;
      }
    );
  };

  handleCancel = () => {
    this.props.dispatch(showMarkerAddModal(false));
    this.props.dispatch(shouldShowContextMenu(false));
  };

  handleCreate = async () => {
    this.props.dispatch(shouldShowContextMenu(false));
    const form = this.formRef.props.form;
    form.validateFields(async (err, values) => {
      if (!err) {
        values.marker_lat = parseFloat(values.lat);
        values.marker_lng = parseFloat(values.lng);
        values.map = this.props.data.id;
        values.marker_info = [
          { title: "Information", value: values.marker_info },
        ];
        if (values.default_image) {
          values.default_image = values.default_image[0].response.url;
        }
        const result = await this.postNewMarker(values);
        if (result) {
          message.success(
            "Successful submission. Marker will be added pending moderator approval"
          );
          this.props.dispatch(showMarkerAddModal(false));
        } else {
          message.error("Unsuccessful submission");
        }
        form.resetFields();
      }
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render() {
    const imageProps = {
      name: "file",
      multiple: false,
      data: (data) => {
        data.timestamp = (Date.now() / 1000) | 0;
        data.upload_preset = "arqsmfbb";
        data.api_key = "553857945975548";
        return data;
      },
      headers: { "X-Requested-With": "XMLHttpRequest" },
      onChange(info) {
        const status = info.file.status;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <div>
        <Form
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          lat={this.props.lat}
          lng={this.props.lng}
          imageProps={imageProps}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  shouldShowModal: state.shouldShowModal,
  lat: state.latLngFromContext.lat,
  lng: state.latLngFromContext.lng,
  data: state.data,
});

export default connect(mapStateToProps)(MarkerModal);
