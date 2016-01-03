import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import AppRouter from './AppRouter'
import '../dist/index.css'

render(
  <Provider store={store}>
    { AppRouter }
  </Provider>,
  document.getElementById('root')
)
