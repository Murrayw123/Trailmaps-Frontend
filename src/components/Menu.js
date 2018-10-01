import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon, Divider } from 'antd'
import DistanceCalculator from './DistanceCalculator'
import DistanceCalculatorForm from './DistanceCalculatorForm'
import Markers from './Markers'
import CustomJourney from './CustomJourney'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class Sider extends React.Component {
  handleClick = e => {
    console.log('click ', e)
  }

  render() {
    const { data } = this.props
    return (
      <Menu
        className="overlayMenu"
        onClick={this.handleClick}
        style={{ width: 350 }}
        defaultOpenKeys={['menu']}
        mode="inline"
      >
        <SubMenu
          key="menu"
          title={
            <span>
              <Icon
                style={{ fontSize: '1.4em' }}
                type="setting"
                theme="outlined"
                className="icons-large"
              />{' '}
              <span id="map-tool-heading">{data.name} Map Tools</span>
            </span>
          }
        >
          <Divider style={{ margin: 0 }} />
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="search" theme="outlined" className="sub-icon" />
                <span className="sub-heading">Locate Point on Map</span>
              </span>
            }
          >
            <div style={{ marginLeft: 48 }}>
              <DistanceCalculator placeHolder={'Point on map'} />
            </div>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="calculator" theme="outlined" className="sub-icon" />
                <span className="sub-heading">Distance Calculator</span>
              </span>
            }
          >
            <DistanceCalculatorForm />
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="select" theme="outlined" className="sub-icon" />
                <span className="sub-heading"> Filter Markers</span>
              </span>
            }
          >
            <Markers style={{ marginLeft: 48, width: 200 }} />
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="picture" theme="outlined" className="sub-icon" />
                <span className="sub-heading">Change Map Terrain</span>
              </span>
            }
          />
          <SubMenu
            key="sub5"
            title={
              <span>
                <Icon type="edit" theme="outlined" className="sub-icon" />
                <span className="sub-heading">
                  Custom Journey / Interactivity
                </span>
              </span>
            }
          >
            <Markers
              style={{ paddingBottom: 20, width: 200, marginLeft: 48 }}
            />
          </SubMenu>
        </SubMenu>
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps)(Sider)
