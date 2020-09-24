import React, { Component } from "react";
import { ServicesContext } from "ServiceInit";

export class TestComponent extends Component<any, any> {
  static contextType = ServicesContext;

  componentDidMount() {
    console.log("test", this.context);
  }

  render() {
    return <div>poop</div>;
  }
}
