import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AutoComplete } from 'antd'

class DistanceCalculator extends Component {
  render() {
    const { data } = this.props
    const dataSource = []
    data.markers.map(marker => {
      dataSource.push({ value: marker.id, text: marker.name })
    })

    return (
      <div>
        <AutoComplete
          style={{ width: 250 }}
          dataSource={dataSource}
          placeholder={this.props.placeHolder}
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps)(DistanceCalculator)
