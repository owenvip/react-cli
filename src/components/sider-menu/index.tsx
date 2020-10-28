import React, {
  FC,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  ComponentType,
} from 'react'
import { useLocation, useHistory, matchPath } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { SiderTheme } from 'antd/lib/layout/Sider'
import { RouteConfig } from '@/interfaces/route'
import BasicLogo from '@/components/basic-logo'
import flattenRoutes from '@/utils/flatten-routes'
import styles from './index.module.less'
import classnames from 'classnames'

const { Sider } = Layout
const { SubMenu, Item: MenuItem } = Menu

interface Props {
  width?: number
  theme?: SiderTheme
  routes?: RouteConfig[]
  logo?: ComponentType | null
}

function getKeyByPath(path?: string | string[]) {
  return Array.isArray(path) ? path[0] : path
}

function renderMenuItems(routes: RouteConfig[] = []): ReactNode[] {
  return routes
    .map((route) => {
      const { path, meta = {}, routes: childRoutes = [] } = route
      const { visible = true, title, icon } = meta
      const key = getKeyByPath(path)
      const visibleChildRoutes = childRoutes.filter(({ meta = {} }) => {
        const { visible = true } = meta
        return visible
      })
      if (visible) {
        const el = (
          <>
            {icon}
            <span>{title}</span>
          </>
        )
        if (visibleChildRoutes.length) {
          return (
            <SubMenu key={key} title={el}>
              {renderMenuItems(visibleChildRoutes)}
            </SubMenu>
          )
        } else {
          return <MenuItem key={key}>{el}</MenuItem>
        }
      } else {
        return null
      }
    })
    .filter((v) => v)
}

const SiderMenu: FC<Props> = ({
  width = 200,
  theme = 'dark',
  logo: Logo = BasicLogo,
  routes = [],
}) => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [collapsed, setCollapsed] = useState(false)

  const handleCollapsedChange = useCallback((collapsed) => {
    setCollapsed(collapsed)
  }, [])

  const flattenedRoutes = useMemo(() => flattenRoutes(routes), [routes])

  const menu = useMemo(() => renderMenuItems(routes), [routes])

  const handleMenuItemClick = useCallback(
    ({ key }) => {
      if (pathname !== key) {
        history.push(key)
      }
    },
    [history, pathname]
  )

  const matchedKeys = useMemo(() => {
    return flattenedRoutes
      .map((route) => {
        const match = matchPath(pathname, route)
        return match ? getKeyByPath(route.path) : undefined
      })
      .filter((v) => v)
  }, [flattenedRoutes, pathname]) as string[]

  return (
    <Sider
      theme={theme}
      className={classnames(styles.siderMenu, {
        [styles.noLogo]: !Logo,
      })}
      collapsible
      defaultCollapsed={collapsed}
      width={width}
      onCollapse={handleCollapsedChange}
    >
      {Logo ? (
        <div className={styles.siderMenuHeader}>
          <Logo collapsed={collapsed} />
        </div>
      ) : null}
      <Menu
        theme={theme}
        mode="inline"
        defaultOpenKeys={matchedKeys}
        selectedKeys={matchedKeys}
        onClick={handleMenuItemClick}
      >
        {menu}
      </Menu>
    </Sider>
  )
}

export default SiderMenu
