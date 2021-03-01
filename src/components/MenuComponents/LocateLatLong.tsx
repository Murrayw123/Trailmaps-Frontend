import React, { Component } from "react";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Group from "antd/lib/input/Group";
import { LAT, LONG } from "Interfaces/Consts";
import "./LocateLatLong.css";

interface Props {
  onChange: (lat: number, long: number) => void;
}

interface State {
  lat: number;
  long: number;
}

export class LocateLatLong extends Component<Props, State> {
  state = { lat: null, long: null };

  onChange = (type: "lat" | "long", latOrLong: number): void => {
    this.setState({ [type]: latOrLong } as Pick<State, keyof State>);
  };

  onSubmit = (): void => {
    this.props.onChange(this.state.lat, this.state.long);
  };

  render(): JSX.Element {
    return (
      <Group compact className={'lat-long-group'}>
        <Input
          style={{ width: 85 }}
          placeholder="-31.950"
          onChange={(e) => this.onChange(LAT, parseFloat(e.target.value))}
        />
        <Input
          style={{ width: 85 }}
          placeholder="115.860"
          onChange={(e) => this.onChange(LONG, parseFloat(e.target.value))}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={this.onSubmit}
          disabled={!this.state.lat || !this.state.long}
          style={{ width: 32 }}
        />
      </Group>
    );
  }
}
