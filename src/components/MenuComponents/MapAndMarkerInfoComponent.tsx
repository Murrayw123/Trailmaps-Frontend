import { Card, Divider } from "antd";
import { MapBlurbComponent } from "components/MenuComponents/MapBlurbComponent";
import { MapStatsComponent } from "components/MenuComponents/MapStatsComponent";
import React from "react";
import * as _ from "lodash";
import { GlobalState } from "Interfaces/GlobalState";

interface Props {
  sideBarImage: string;
  focusMarker: GlobalState["focusMarker"];
  sideBarBlurb: string;
  mapData: GlobalState["mapData"];
}

export class MapAndMarkerInfoComponent extends React.Component<Props, never> {
  render() {
    const { sideBarImage, focusMarker, mapData, sideBarBlurb } = this.props;

    return (
      <Card bordered={false} className="info-card">
        {!_.isEmpty(sideBarImage) &&
        sideBarImage !== "" &&
        sideBarImage != null ? (
          <span>
            <img className="map-blurb-img" src={sideBarImage} />
          </span>
        ) : null}
        <Divider className="map-info-divider" />
        <MapBlurbComponent
          focusMarker={focusMarker}
          sideBarBlurb={sideBarBlurb}
        />
        <MapStatsComponent focusMarker={focusMarker} mapData={mapData} />
      </Card>
    );
  }
}
