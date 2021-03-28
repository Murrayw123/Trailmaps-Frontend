import { Divider } from "antd";
import * as _ from "lodash";
import React from "react";

interface Props {
  data: any;
  focusMarker: unknown;
}

export class MapStatsComponent extends React.Component<Props, never> {
  render() {
    const { data, focusMarker } = this.props;
    return (
      <div>
        <Divider className="map-info-divider" />
        <div key={"divider"}>
          {!_.isEmpty(data.stats) && _.isEmpty(focusMarker)
            ? data.stats.map((el) => {
                return (
                  <div key={el.key}>
                    <b>{el.key}</b> : {el.value}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}
