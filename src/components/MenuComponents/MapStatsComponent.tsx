import { Divider } from "antd";
import * as _ from "lodash";
import React from "react";
import { GlobalState } from "Interfaces/GlobalState";

interface Props {
  mapData: GlobalState["mapData"];
  focusMarker: GlobalState["focusMarker"];
}

export class MapStatsComponent extends React.Component<Props, never> {
  render() {
    const { mapData, focusMarker } = this.props;
    return (
      <div>
        <Divider className="map-info-divider" />
        <div key={"divider"}>
          {!_.isEmpty(mapData.stats) && _.isEmpty(focusMarker)
            ? mapData.stats.map((el) => {
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
