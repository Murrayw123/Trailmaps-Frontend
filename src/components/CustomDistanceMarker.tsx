import { Component, ReactElement } from "react";
import { customDistanceMarkerComponent } from "components/MapSubComponents";
import { GlobalState } from "Interfaces/GlobalState";
import { connect } from "react-redux";
import { MapData } from "objects/MapData";

interface Props {
  customDistanceMarker: GlobalState["customDistanceMarker"];
  mapData: MapData;
}

class CustomDistanceMarker extends Component<Props, never> {
  customDistanceMarker = (): ReactElement => {
    const { customDistanceMarker, mapData } = this.props;
    if (customDistanceMarker) {
      return customDistanceMarkerComponent(mapData.type, customDistanceMarker);
    } else {
      return null;
    }
  };

  render(): JSX.Element {
    return this.customDistanceMarker();
  }
}

const mapStateToProps = (state: GlobalState) => ({
  mapData: state.mapData,
  customDistanceMarker: state.customDistanceMarker,
});

export default connect(mapStateToProps)(CustomDistanceMarker);
