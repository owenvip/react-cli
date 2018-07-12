import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from '../components/home'
import Test from '../components/test'
import Detail from '../components/detail'
import User from '../components/user'

export default () => [
  <Route path="/" key="home" component={Home} exact />,
  <Route path="/a" key="a" render={() => <Redirect to="/test" />} />,
  <Route path="/test" key="test" component={Test} />,
  <Switch key="switch">
    <Route path="/b/detail" key="detail" component={Detail} />,
    <Route path="/b/:id" key="user" component={User} />
  </Switch>,
]
