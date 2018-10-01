import React, { Component } from 'react'
import { connect } from 'react-redux'
import MapComponent from './MapComponent'
import { fetchData } from '../redux/actions'
import Sider from './Menu.js'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchData())
  }

  render() {
    const { loading } = this.props
    if (loading) {
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
  loading: state.loading
})

export default connect(mapStateToProps)(App)
