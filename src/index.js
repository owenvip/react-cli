import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'

import appState from './store/state'


const root = document.getElementById('root')
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AppContainer>, root)
}

render()

if (module.hot) {
  module.hot.accept(() => {
    render()
  })
}

