import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState } from '../store/state' // 此处引入仅用于严格限制为state格式

@inject('appState')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.appState.getGlobalInfo()
    console.log(this.props.appState.globalInfo)
  }
  changeName(event) {
    this.props.appState.changeName(event.target.value)
  }
  render() {
    return (
      <div>
        <p>这是首页!{this.props.appState.msg}</p>
        <input onChange={this.changeName.bind(this)} />
      </div>
    )
  }
}

Home.prototypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}

