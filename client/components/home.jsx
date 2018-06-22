import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { request } from '../utils/axios'
import '../style/main.less'
import { AppState } from '../store/state' // 此处引入仅用于严格限制为state格式

@inject('appState')
@observer
export default class Home extends Component {
  componentDidMount() {
    async function test() {
      const result = await request({
        url: '/pubapi/global/globalInfo',
        method: 'get',
      })
      return Promise.resolve(result.data)
    }
    test().then(data => console.log(data)).catch(err => console.log(err))
  }
  changeName(event) {
    this.props.appState.changeName(event.target.value)
  }
  render() {
    return (
      <div>
        <p>这是首页!{this.props.appState.msg}</p>
        <input onChange={this.changeName.bind(this)} />
        <p>{this.props.appState.globalInfo.summary}</p>
        <p className="testBg" />
      </div>
    )
  }
}
Home.prototypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}

