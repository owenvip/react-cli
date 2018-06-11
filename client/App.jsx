import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Routes from './router/router'

export default class App extends Component {
  render() {
    return [
      <div key="main">
        <Link to="/">首页</Link>
        <Link to="/test">测试页</Link>
      </div>,
      <Routes key="routes" />,
    ]
  }
}
