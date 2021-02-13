import {
  CalculatorOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  SelectOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const MapTools = (): JSX.Element => {
  return (
    <>
      <span>
        <SettingOutlined style={{ fontSize: "1.4em" }} />
        <span id="map-tool-heading"> Map Tools</span>
      </span>
    </>
  );
};

export const LocatePoint = (): JSX.Element => {
  return (
    <>
      <span>
        <SearchOutlined />
        <span className="sub-heading">Locate Point on Map</span>
      </span>
    </>
  );
};

export const FilterMarkersHeader = (): JSX.Element => {
  return (
    <span>
      <SelectOutlined />
      <span className="sub-heading"> Filter Visible Markers</span>
    </span>
  );
};

export const LiveTrailUsers = (): JSX.Element => {
  return (
    <span>
      <UserOutlined />
      <span className="sub-heading"> Live Trail Users</span>
    </span>
  );
};

export const MapAndMarkerInformation = (): JSX.Element => {
  return (
    <span>
      <InfoCircleOutlined />
      <span className="sub-heading">Map & Marker Information</span>
    </span>
  );
};

export const DistanceAndElevation = (): JSX.Element => {
  return (
    <span>
      <CalculatorOutlined />
      <span className="sub-heading">Distance and Elevation</span>
    </span>
  );
};
