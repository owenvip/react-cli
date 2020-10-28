import React, { FC, Suspense } from 'react'
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router'
import styles from './index.module.less'
import PageLoading from '@/components/page-loading'
import { RouteConfig } from '@/interfaces/route'

interface Props extends RouteComponentProps {
  routes?: RouteConfig[]
}

const Exception: FC<Props> = ({ routes = [] }) => (
  <div className={styles.error}>
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {routes.map((route, i) => (
          <Route {...route} key={i} />
        ))}
        <Redirect from="*" to="/error/404" />
      </Switch>
    </Suspense>
  </div>
)

export default Exception
