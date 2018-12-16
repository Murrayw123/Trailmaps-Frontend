import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {TreeSelect} from "antd";

const TreeNode = TreeSelect.TreeNode;

export class MapSelect extends Component {
  onMapSelect = value => {
      window.location.href = "/maps/"+ value;
  };
  render() {
    const { allMaps } = this.props;
    return (
      <TreeSelect
        className="map-select"
        value={this.props.data.map_name}
        placeholder={"Select a Map"}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        allowClear
        size={"large"}
        onSelect={this.onMapSelect}
      >
        <TreeNode
          selectable={false}
          isLeaf={false}
          value="cycling"
          title="Cycle Trails"
          key="0-0"
        >
          {allMaps.map((map, index) => {
            if (map.cycling) {
              return (
                <TreeNode
                  value={map.map_alias}
                  title={map.map_name}
                  key={"0" + index}
                />
              );
            }
          })}
        </TreeNode>
        <TreeNode
          selectable={false}
          isLeaf={false}
          value="hiking"
          title="Bushwalking Trails"
          key="1-0"
        >
          {allMaps.map((map, index) => {
            if (map.walking) {
              return (
                <TreeNode
                  value={map.map_alias}
                  title={map.map_name}
                  key={"1" + index}
                />
              );
            }
          })}
        </TreeNode>
      </TreeSelect>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  allMaps: state.allMaps
});

export default connect(mapStateToProps)(MapSelect);
