import React from "react";
import * as _ from "lodash";

interface Props {
  focusMarker: any;
  sideBarBlurb: string;
}

export class MapBlurbComponent extends React.Component<Props, never> {
  render() {
    const { focusMarker, sideBarBlurb } = this.props;
    return (
      <p style={{ marginRight: 20 }}>
        <b> Information: </b>
        {_.isEmpty(focusMarker) ? sideBarBlurb : focusMarker.marker_blurb}
      </p>
    );
  }
}
