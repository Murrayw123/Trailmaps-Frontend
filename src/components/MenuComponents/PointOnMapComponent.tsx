import { Divider } from "antd";
import React from "react";
import DistanceCalculator from "components/DistanceCalculator";

interface Props {
  poiMarkers: unknown;
  dataSelect: unknown;
  focusMarker: unknown;
}

export class PointOnMap extends React.Component<Props, never> {
  render() {
    const { poiMarkers, focusMarker, dataSelect } = this.props;

    return (
      <>
        <DistanceCalculator
          placeHolder={"Point on map"}
          dataSource={poiMarkers}
          type={"locate"}
          onSelect={dataSelect}
          value={focusMarker}
          markerType={"distance"}
        />
      </>
    );
  }
}
