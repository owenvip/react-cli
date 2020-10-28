import { ComponentType, ReactNode } from 'react'
import { RouteProps } from 'react-router'

export interface RouteMeta {
  auth?: boolean
  header?: ComponentType | null
  footer?: ComponentType | null
  sider?: ComponentType | null
  name?: string
  title?: ReactNode
  icon?: ReactNode
  visible?: boolean
}

export interface RouteConfig extends RouteProps {
  meta?: RouteMeta
  routes?: RouteConfig[]
}
