import { Card, Divider } from "antd";
import { MapBlurbComponent } from "components/MenuComponents/MapBlurbComponent";
import { MapStatsComponent } from "components/MenuComponents/MapStatsComponent";
import React from "react";
import * as _ from "lodash";

interface Props {
  sideBarImage: string;
  focusMarker: unknown;
  sideBarBlurb: string;
  data: unknown;
}

export class MapAndMarkerInfoComponent extends React.Component<Props, never> {
  render() {
    const { sideBarImage, focusMarker, data, sideBarBlurb } = this.props;

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
        <MapStatsComponent focusMarker={focusMarker} data={data} />
      </Card>
    );
  }
}
