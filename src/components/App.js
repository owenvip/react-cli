import React, { Component } from 'react'
import { observer, inject, PropTypes as PropTypesObservable } from 'mobx-react'
import PropTypes from 'prop-types'
import { withRouter, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import routes from '../router/router'
import Loadable from '../utils/loadable'
import { request } from '../utils/axios'
import '../style/main.less'
import { AppState } from '../store/state' // 此处引入仅用于严格限制为state格式

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 404
const LoadableNoMatch = Loadable({
  loader: () => import(/* webpackChunkName: "route-noMatch" */ './NoMatch'),
});

@inject('appState')
@withRouter
@observer
export default class App extends Component {
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

  renderRoute = ({ path, component }) => (
    <Route key={path} path={path} component={component} exact />
  )

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="home"><Link to="/">首页</Link></Menu.Item>
            <Menu.Item key="test"><Link to="/test">测试页</Link></Menu.Item>
            <Menu.Item key="user"><Link to="/b/detail">用户页</Link></Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <Switch>
                {routes.map(this.renderRoute)}
                <Route component={LoadableNoMatch} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
App.prototypes = {
  appState: PropTypesObservable.observableObject.isRequired,
}
App.defaultProps = {
  testVlaue: 'mlgb',
}

