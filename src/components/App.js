import React, { Component } from 'react'
import { connect } from 'react-redux'
import MapComponent from './MapComponent'
import { fetchData } from '../redux/actions'
import { fetchMarkers } from '../redux/actions'
import Sider from './Menu.js'

class App extends Component {
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
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  data: state.data,
  loadingTrack: state.loadingTrack,
  loadingMarkers: state.loadingMarkers
})

export default connect(mapStateToProps)(App)
