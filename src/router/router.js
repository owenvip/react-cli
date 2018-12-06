import Loadable from '../utils/loadable'

const routes = [
  {
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "route-home" */ '../components/Home/Home'),
    }),
  },
  {
    path: '/test',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "route-test" */ '../components/Test/Test'),
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
          loader: () => import(/* webpackChunkName: "route-detail" */ '../components/Detail/Detail'),
        }),
      },
      {
        path: '/:id',
        component: Loadable({
          loader: () => import(/* webpackChunkName: "route-user" */ '../components/User/User'),
        }),
      },
    ],
  },
]

export default routes
