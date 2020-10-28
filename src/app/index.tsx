import React, { ComponentType, FC, Suspense } from 'react'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { MenuLayout as Layout } from '@/layouts'
import PageLoading from '@/components/page-loading'
import routes from '@/routes'
import { History } from 'history'
import '@/styles/index.less'

interface Props {
  history: History
}

function renderComponent(Cmp: ComponentType | undefined, props: any) {
  return Cmp ? <Cmp {...props} /> : null
}

const App: FC<Props> = ({ history }) => (
  <Router history={history}>
    <Layout routes={routes}>
      <Suspense fallback={<PageLoading />}>
        <Switch>
          {routes.map(
            (
              { component: Cmp, routes: childRoutes, ...restProps },
              index: number
            ) => (
              <Route
                key={index}
                {...restProps}
                render={(props) =>
                  renderComponent(Cmp as ComponentType, {
                    ...props,
                    routes: childRoutes,
                  })
                }
              />
            )
          )}
          <Redirect from="*" to="/error/404" />
        </Switch>
      </Suspense>
    </Layout>
  </Router>
)

export default App
