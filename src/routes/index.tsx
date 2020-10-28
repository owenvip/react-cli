import React, { lazy } from 'react'
import {
  DashboardOutlined,
  DatabaseOutlined,
  BugOutlined,
  LockOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { RouteConfig } from '@/interfaces/route'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: lazy(() => import('@/pages/home')),
    exact: true,
    meta: {
      auth: false,
      icon: <DashboardOutlined />,
      title: 'Dashboard',
    },
  },
  {
    path: '/demo',
    component: lazy(() => import('@/pages/demo')),
    exact: true,
    meta: {
      auth: false,
      title: 'Demo',
      icon: <DatabaseOutlined />,
    },
  },
  {
    path: '/error',
    component: lazy(() => import('@/pages/error')),
    meta: {
      auth: false,
      title: 'Error Page',
      icon: <BugOutlined />,
      visible: false,
    },
    routes: [
      {
        path: '/error/403',
        component: lazy(() => import('@/pages/error/403')),
        meta: {
          title: '403',
          icon: <LockOutlined />,
        },
      },
      {
        path: '/error/404',
        component: lazy(() => import('@/pages/error/404')),
        meta: {
          title: '404',
          icon: <QuestionCircleOutlined />,
        },
      },
    ],
  },
]

export default routes
