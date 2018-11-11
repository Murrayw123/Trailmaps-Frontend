import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import MapComponent from './MapComponent'
import ElevationChart from './ElevationChart'
import { fetchData } from '../redux/actions'
import { fetchMarkers } from '../redux/actions'
import { Rnd as ElevationChartWrapper } from 'react-rnd'
import Sider from './Menu.js'

class App extends Component {
  state = { width: '40%', height: 125 }
  componentDidMount() {
    let currentMap = window.location.pathname.substring(1)
    this.props.dispatch(fetchData(currentMap))
    this.props.dispatch(fetchMarkers(currentMap))
  }

  render() {
    const { loadingTrack, loadingMarkers } = this.props
    if (loadingTrack || loadingMarkers) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="map">
          <MapComponent />
          <Sider />
          {!_.isEmpty(this.props.customPath) ? (
            <ElevationChartWrapper
              className="elevation-chart"
              size={{ width: this.state.width, height: this.state.height }}
              onResize={(e, direction, ref, delta, position) => {
                this.setState({
                  width: ref.style.width,
                  height: ref.style.height,
                  ...position
                })
              }}
            >
              <ElevationChart />
            </ElevationChartWrapper>
          ) : null}
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  data: state.data,
  loadingTrack: state.loadingTrack,
  loadingMarkers: state.loadingMarkers,
  filters: state.filters,
  poiMarkers: state.poiMarkers,
  customPath: state.customPath,
  elevationChartData: state.elevationChartData
})

export default connect(mapStateToProps)(App)
