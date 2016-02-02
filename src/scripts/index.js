require('es6-promise').polyfill()
import 'whatwg-fetch'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import AppRouter from './AppRouter'
import { DevTools } from './containers'
import '../stylus/index.styl'

if (process.env.NODE_ENV === 'production') {
  render(
    <Provider store={store}>
      { AppRouter }
    </Provider>,
    document.getElementById('root')
  )
} else {
  render(
    <Provider store={store}>
      <div>
        { AppRouter }
        <DevTools />
      </div>
    </Provider>,
    document.getElementById('root')
  )
}
