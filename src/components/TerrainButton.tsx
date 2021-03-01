import { Button, Tooltip } from "antd";
import { AreaChartOutlined, GlobalOutlined } from "@ant-design/icons";
import { GlobalState } from "Interfaces/GlobalState";
import { connect } from "react-redux";
import "./TerrainButton.css";

interface TerrainButtonProps {
  mapPitched: boolean;
  setPitched: (status: boolean) => void;
}

const TerrainButton = (props: TerrainButtonProps): JSX.Element => {
  const { mapPitched, setPitched } = props;

  return (
    <>
      {mapPitched ? (
        <Tooltip title={"2D"}>
          <Button
            className={"terrain-button"}
            shape="circle"
            icon={<AreaChartOutlined />}
            onClick={() => setPitched(false)}
          />
        </Tooltip>
      ) : (
        <Tooltip title={"3D"}>
          <Button
            className={"terrain-button"}
            shape="circle"
            icon={<GlobalOutlined />}
            onClick={() => setPitched(true)}
          />
        </Tooltip>
      )}
    </>
  );
};

const mapStateToProps = (state: GlobalState, ownProps: TerrainButtonProps) => ({
  mapPitched: state.mapPitched,
  setPitched: ownProps.setPitched,
});

export const MapTerrainButton = connect(mapStateToProps)(TerrainButton);
