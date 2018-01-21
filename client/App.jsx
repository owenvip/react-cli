import React,{ Component } from 'react'
import Routes from './router/router'
import { Link } from 'react-router-dom'

export default class App extends Component {
    render() {
        return [
          <div key="main">
            <Link to="/">首页</Link>
            <Link to="/test">测试页</Link>
          </div>,
          <Routes key="routes"/>
        ]
    }
}
