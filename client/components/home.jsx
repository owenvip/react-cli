import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import '../style/main.less'
import PropTypes from 'prop-types'
import { AppState } from '../store/state' // 此处引入仅用于严格限制为state格式

@inject('appState')
@observer
export default class Home extends Component {
  changeName(event) {
    this.props.appState.changeName(event.target.value)
  }
  render() {
    return (
      <div>
        <p>这是首页!{this.props.appState.msg}</p>
        <input onChange={this.changeName.bind(this)} />
        <p>{this.props.appState.globalInfo.summary}</p>
        <img src="/static/img/test.jpg" alt="" />
      </div>
    )
  }
}

Home.prototypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}

