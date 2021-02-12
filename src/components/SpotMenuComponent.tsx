import { Button, Card, Switch, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import DistanceCalculator from "components/DistanceCalculator";
import _ from "lodash";
import React from "react";

interface Props {
  focusMarker: unknown;
  liveTrailUsers: unknown;
  showLiveTrailUsers: any;
  toggleShowLiveTrailUsers: (res: any) => void;
  dataSelect: any;
}

export class SpotMenuComponent extends React.Component<Props, never> {
  render() {
    const {
      showLiveTrailUsers,
      toggleShowLiveTrailUsers,
      liveTrailUsers,
      focusMarker,
      dataSelect,
    } = this.props;

    return (
      <div key={"div"} style={{ marginLeft: 48 }}>
        <Card
          className="filter-trail-users"
          bordered={false}
          style={{ width: 250 }}
        >
          <span>
            Show all live trail users
            <Tooltip title="Find users with a registered SPOT or Garmin GPS device">
              <QuestionCircleOutlined
                style={{ paddingLeft: 4, fontSize: 12 }}
              />
            </Tooltip>
            <Switch
              size="small"
              style={{ marginLeft: 5 }}
              checked={showLiveTrailUsers}
              onChange={toggleShowLiveTrailUsers}
            />
          </span>
        </Card>
        <DistanceCalculator
          placeHolder={"Find Trail User"}
          dataSource={liveTrailUsers}
          type={"locate"}
          onSelect={dataSelect}
          value={_.has(focusMarker, "gps_locations") ? focusMarker : null}
          markerType={"liveTrailUser"}
        />
        <Button href={"https://forms.gle/ajMvSzBzQg83XE5F7"} target={"_blank"}>
          Link a GPS Tracker
        </Button>
      </div>
    );
  }
}
