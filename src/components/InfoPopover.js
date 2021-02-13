import { Popover } from "antd";
import { Component } from "react";
import React from "react";
import Icon, {InfoCircleFilled, InfoCircleOutlined} from "@ant-design/icons";

export class InfoPopover extends Component {
  content = (
    <div className="credits">
      <p>
        Site Built By <a href="https://murrayw123.github.io"> Murray Watts </a>
      </p>
      <br />
      <p>
        Found a bug? Want to tell me the site sucks? Got a trail that you think
        should be added? Get in touch{" "}
        <a href="https://murrayw123.github.io/contact.html"> here </a>
      </p>
      <br />
      <p className="attribute-info">
        Icons made by Icon Pond, Smashicons and Freepik from www.flaticon.com is
        licensed by CC 3.0 BY
      </p>
    </div>
  );

  render() {
    return (
      <div className={"info-icon"}>
        <Popover
          content={this.content}
          title="Credits and Information"
          placement="topRight"
          trigger="click"
        >
          <InfoCircleFilled />
        </Popover>
      </div>
    );
  }
}
