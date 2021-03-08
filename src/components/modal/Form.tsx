import React from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Tooltip,
  Upload,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { markerChoices } from "helpers/iconsData";

const { TextArea } = Input;

interface Props {
  onCancel: any;
  onCreate: any;
  lat: number;
  lng: number;
  imageProps: any;
  form: any;
}

const Item = Form.Item;
const Option = Select.Option;

export const MarkerCreateForm: React.FC<Props> = ({
  form,
  onCancel,
  onCreate,
  lat,
  lng,
  imageProps,
}) => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      visible={true}
      title="Add New Marker"
      okText="Submit for Approval"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical" form={form}>
        <Item
          name={"marker_title"}
          rules={[
            {
              required: true,
              message: "Please input the name of the marker",
            },
          ]}
          label={
            <span>
              Marker name
              <Tooltip title="A short name for the marker to appear on the map. Do not include any information about distance or elevation.">
                <QuestionCircleOutlined className={"helper-icon"} />
              </Tooltip>
            </span>
          }
        >
          <Input />
        </Item>
        <span>
          <Item
            name={"lat"}
            style={{ display: "inline-block" }}
            label="Latitude"
            initialValue={lat.toFixed(5)}
          >
            <InputNumber style={{ width: 200 }} disabled={true} />
          </Item>
          <Item
            style={{ display: "inline-block", paddingLeft: 10 }}
            label="Longitude"
            name={"lng"}
            initialValue={lng.toFixed(5)}
          >
            <InputNumber style={{ width: 200 }} disabled={true} />
          </Item>
        </span>
        <Item
          name={"marker_type"}
          rules={[
            {
              required: true,
              message: "Please select the type of marker",
            },
          ]}
          label={
            <span>
              Type of marker
              <Tooltip title="Choose from one of the following options. Different icons appear for each type">
                <QuestionCircleOutlined className={"helper-icon"} />
              </Tooltip>
            </span>
          }
          hasFeedback
        >
          <Select
            showSearch
            dropdownClassName={"marker-type-dropdown"}
            placeholder="Type of marker"
          >
            {markerChoices.map((marker, count) => {
              return (
                <Option key={count.toString()} value={marker.id}>
                  {" "}
                  {marker.name}{" "}
                </Option>
              );
            })}
          </Select>
        </Item>
        <Item
          name={"marker_info"}
          rules={[
            {
              required: true,
              message: "Marker popup information is required",
            },
          ]}
          label={
            <span>
              Popup Information
              <Tooltip title="This information appears above the marker when it's clicked. Do not include any information about distance or elevation.">
                <QuestionCircleOutlined className={"helper-icon"} />
              </Tooltip>
            </span>
          }
        >
          <TextArea rows={2} />
        </Item>
        <Item
          name={"marker_blurb"}
          rules={[
            {
              required: true,
              message: "A short sidebar blurb is required",
            },
          ]}
          label={
            <span>
              Sidebar Description
              <Tooltip title="This information appears on the collapsible sidebar. Do not include any information about distance or elevation.">
                <QuestionCircleOutlined className={"helper-icon"} />
              </Tooltip>
            </span>
          }
        >
          <TextArea rows={3} />
        </Item>
        <Item
          name={"default_image"}
          getValueFromEvent={normFile}
          label={
            <span>
              Image
              <Tooltip title="An image is not required but is handy!">
                <QuestionCircleOutlined className={"helper-icon"} />
              </Tooltip>
            </span>
          }
        >
          <div className="dropbox">
            <Upload
              {...imageProps}
              name="file"
              action="https://api.cloudinary.com/v1_1/dqlvslhyi/image/upload"
            >
              <Button>
                <Tooltip title="Accepts small jpegs and PNGs">
                  <QuestionCircleOutlined className={"helper-icon"} /> Click to
                  upload
                </Tooltip>
              </Button>
            </Upload>
          </div>
        </Item>
      </Form>
    </Modal>
  );
};
