import { Component, ReactElement } from "react";
import { customDistanceMarkerComponent } from "components/MapSubComponents";
import { GlobalState } from "Interfaces/GlobalState";
import { MapData } from "Interfaces/MapData";
import { connect } from "react-redux";

interface Props {
  customDistanceMarker: GlobalState["customDistanceMarker"];
  data: MapData;
}

class CustomDistanceMarker extends Component<Props, never> {
  customDistanceMarker = (): ReactElement => {
    const { customDistanceMarker, data } = this.props;
    if (customDistanceMarker) {
      return customDistanceMarkerComponent(data.map_type, customDistanceMarker);
    } else {
      return null;
    }
  };

  render(): JSX.Element {
    return this.customDistanceMarker();
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  customDistanceMarker: state.customDistanceMarker,
});

export default connect(mapStateToProps)(CustomDistanceMarker);
