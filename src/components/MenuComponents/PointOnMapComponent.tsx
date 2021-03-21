import { Divider } from "antd";
import React from "react";
import DistanceCalculator from "components/DistanceCalculator";
import { changeFocusPoint } from "redux/actions";
import { Dispatch } from "redux";
import { Marker } from "Interfaces/Marker";
import { LocateLatLong } from "components/MenuComponents/LocateLatLong";

interface Props {
  poiMarkers: Array<Marker>;
  dataSelect: unknown;
  focusMarker: unknown;
  dispatch: Dispatch;
}

export class PointOnMap extends React.Component<Props, never> {
  onLatLngChanged = (lat: number, long: number): void => {
    this.props.dispatch(changeFocusPoint([lat, long]));
  };

  render(): JSX.Element {
    const { poiMarkers, focusMarker, dataSelect } = this.props;

    return (
      <>
        <DistanceCalculator
          placeHolder={"Find marker on map"}
          dataSource={poiMarkers}
          type={"locate"}
          onSelect={dataSelect}
          value={focusMarker}
          markerType={"distance"}
          inputDirty={null}
          mode={null}
        />
        <Divider style={{ marginTop: 11, marginBottom: 11 }} />
        <LocateLatLong onChange={this.onLatLngChanged} />
      </>
    );
  }
}
