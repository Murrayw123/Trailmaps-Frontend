import { Component } from "react";
import { GlobalState } from "Interfaces/GlobalState";
import { generateCustomPath } from "components/MapSubComponents";
import { connect } from "react-redux";

interface Props {
  customPath: GlobalState["customPath"];
}

class customPath extends Component<Props, never> {
  render() {
    return (
      <>
        {displayCustomPath(this.props.customPath)
          ? generateCustomPath(this.props.customPath)
          : null}
      </>
    );
  }
}

function displayCustomPath(customPath: GlobalState["customPath"]): boolean {
  return customPath?.path && !!Object.keys(customPath).length;
}

const mapStateToProps = (state) => ({
  customPath: state.customPath,
});

export const CustomPath = connect(mapStateToProps)(customPath);
