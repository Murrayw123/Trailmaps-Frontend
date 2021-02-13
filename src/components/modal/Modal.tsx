import "@ant-design/compatible/assets/index.css";
import { Form, message } from "antd";
import React, { Component, Dispatch } from "react";
import { shouldShowContextMenu, showMarkerAddModal } from "redux/actions";
import { connect } from "react-redux";
import { MarkerCreateForm } from "components/modal/Form";
import { postNewMarker } from "redux/requests";

interface Props {
  dispatch: Dispatch<any>;
  lat: number;
  lng: number;
  data: any;
}

export const MarkerModal: React.FC<Props> = ({ lat, lng, dispatch, data }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    dispatch(showMarkerAddModal(false));
    dispatch(shouldShowContextMenu(false));
  };

  const handleCreate = async () => {
    dispatch(shouldShowContextMenu(false));
    form.validateFields().then(async (values) => {
      values.marker_lat = parseFloat(values.lat);
      values.marker_lng = parseFloat(values.lng);
      values.map = data.id;
      values.marker_info = [
        { title: "Information", value: values.marker_info },
      ];
      if (values.default_image) {
        values.default_image = values.default_image[0].response.url;
      }
      const result = await postNewMarker(values);
      if (result) {
        message.success(
          "Successful submission. Marker will be added pending moderator approval"
        );
        dispatch(showMarkerAddModal(false));
      } else {
        message.error("Unsuccessful submission");
      }
      form.resetFields();
    });
  };

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
    <>
      <MarkerCreateForm
        form={form}
        onCancel={handleCancel}
        onCreate={handleCreate}
        lat={lat}
        lng={lng}
        imageProps={imageProps}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  shouldShowModal: state.shouldShowModal,
  lat: state.latLngFromContext.lat,
  lng: state.latLngFromContext.lng,
  data: state.data,
});

export default connect(mapStateToProps)(MarkerModal);
