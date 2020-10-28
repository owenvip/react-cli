import React, { FC, useMemo } from 'react'
import { Layout } from 'antd'
import BasicHeader from '@/components/basic-header'
import BasicFooter from '@/components/basic-footer'
import SiderMenu from '@/components/sider-menu'
import styles from './index.module.less'
import { useLocation } from 'react-router'
import flattenRoutes from '@/utils/flatten-routes'
import { pathToRegexp } from 'path-to-regexp'
import { SiderTheme } from 'antd/lib/layout/Sider'
import { LayoutBaseProps } from '../types'

const { Content } = Layout

interface Props extends LayoutBaseProps {
  siderWidth?: number
  theme?: SiderTheme
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
  const {
    header: Header = BasicHeader,
    footer: Footer = BasicFooter,
    sider: Sider = SiderMenu,
  } = meta
  return (
    <Layout className={styles.menuLayout}>
      {Sider ? (
        <Sider theme={theme} width={siderWidth} routes={routes} />
      ) : null}
      <Layout>
        {Header ? <Header left={null} /> : null}
        <Content className={styles.menuLayoutContent}>{children}</Content>
        {Footer ? <Footer /> : null}
      </Layout>
    </Layout>
  )
}

export default MenuLayout
