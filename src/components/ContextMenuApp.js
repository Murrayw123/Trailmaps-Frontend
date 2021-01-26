import React, { Component } from "react";
import { Button, Card } from "antd";
import connect from "react-redux/es/connect/connect";
import { shouldShowContextMenu, showMarkerAddModal } from "../redux/actions";
import Icon from "@ant-design/icons";

export class ContextMenuApp extends Component {
  state = { loading: true, elevation: 0 };

  enableMarkerAdd = e => {
    e.stopPropagation();
    this.props.showMarkerAddModal(true);
  };

  onClick = () => {
    this.props.shouldShowContextMenu(false);
  };

  render() {
    const { lat, lng, x, y, loading, elevationData } = this.props;
    return (
      <div className="context-menu" style={{ left: x, top: y }}>
        <Card
          title="Point Info"
          bordered={false}
          extra={
            <span>
              <a onClick={this.onClick}>
                <Icon type="close" />
              </a>
            </span>
          }
        >
          <p>
            <b> Lat: </b> {parseFloat(lat).toFixed(5)}
          </p>
          <p>
            <b> Lng: </b> {parseFloat(lng).toFixed(5)}
          </p>
          <p>
            <b>Elevation: </b>
            {loading ? <Icon type="loading" /> : elevationData + "m"}
          </p>
          <Button
            className="marker-add"
            onClick={e => {
              return this.enableMarkerAdd(e);
            }}
          >
            Add Marker Here
          </Button>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showMarkerAddModal: bool => {
    dispatch(showMarkerAddModal(bool));
  },
  shouldShowContextMenu: bool => {
    dispatch(shouldShowContextMenu(bool));
  }
});

const mapStateToProps = state => ({
  lat: state.latLngFromContext.lat,
  lng: state.latLngFromContext.lng,
  loading: state.fetchElevationLoading,
  elevationData: state.elevationData
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContextMenuApp);
