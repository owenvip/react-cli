import BasicFooter from '@/components/basic-footer'
import BasicHeader from '@/components/basic-header'
import { Layout } from 'antd'
import { pathToRegexp } from 'path-to-regexp'
import React, { FC, useMemo } from 'react'
import { useLocation } from 'react-router'
import styles from './index.module.less'
import flattenRoutes from '@/utils/flatten-routes'
import { LayoutBaseProps } from '../types'

const { Content } = Layout

const BasicLayout: FC<LayoutBaseProps> = ({ children, routes = [] }) => {
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
  const { header: Header = BasicHeader, footer: Footer = BasicFooter } = meta

  return (
    <Layout className={styles.basicLayout}>
      {Header ? <Header /> : null}
      <Content className={styles.basicLayoutContent}>{children}</Content>
      {Footer ? <Footer /> : null}
    </Layout>
  )
}

export default BasicLayout
