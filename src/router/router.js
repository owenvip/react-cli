import Loadable from '../utils/loadable'

const routes = [
  {
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "route-home" */ '../components/Home'),
    }),
  },
  {
    path: '/test',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "route-test" */ '../components/Test'),
    }),
  },
  {
    path: '/a',
    redirect: '/test',
  },
  {
    path: '/b',
    routes: [
      {
        path: 'detail',
        component: Loadable({
          loader: () => import(/* webpackChunkName: "route-detail" */ '../components/Detail'),
        }),
      },
      {
        path: '/:id',
        component: Loadable({
          loader: () => import(/* webpackChunkName: "route-user" */ '../components/User'),
        }),
      },
    ],
  },
]

export default routes
