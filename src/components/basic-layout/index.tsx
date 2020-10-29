import React, { FC, useMemo } from 'react'
import { Layout } from 'antd'
import BasicHeader from '@/components/basic-header'
import SiderMenu from '@/components/sider-menu'
import styles from './index.module.less'
import { useLocation } from 'react-router'
import flattenRoutes from '@/utils/flatten-routes'
import { pathToRegexp } from 'path-to-regexp'
import { SiderTheme } from 'antd/lib/layout/Sider'
import { RouteConfig } from '@/interfaces/route'

const { Content } = Layout

interface Props {
  siderWidth?: number
  theme?: SiderTheme
  routes?: RouteConfig[]
}

const MenuLayout: FC<Props> = ({
  children,
  routes = [],
  siderWidth = 200,
  theme,
}) => {
  const { pathname } = useLocation()

  const flattenedRoutes = useMemo(() => flattenRoutes(routes), [routes])

  const route = useMemo(
    () =>
      flattenedRoutes.find((route) => {
        if (!route.path) {
          return false
        } else if (Array.isArray(route.path)) {
          route.path.some((path) => {
            const regExp = pathToRegexp(path, [], {})
            return regExp.test(pathname)
          })
        } else {
          const regExp = pathToRegexp(route.path, [], {})
          return regExp.test(pathname)
        }
      }) || {},
    [flattenedRoutes, pathname]
  )

  const { meta = {} } = route
  const { header: Header = BasicHeader, sider: Sider = SiderMenu } = meta
  return (
    <Layout className={styles.basicLayout}>
      {Sider ? (
        <Sider theme={theme} width={siderWidth} routes={routes} />
      ) : null}
      <Layout>
        {Header ? <Header left={null} /> : null}
        <Content className={styles.basicLayoutContent}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default MenuLayout
