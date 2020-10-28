import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import { register } from './service-worker'

register({
  onSuccess: (registration) => {
    console.log(registration)
  },
  onUpdate: (registration) => {
    console.log(registration)
  },
})

ReactDOM.render(<Root />, document.getElementById('root'))
