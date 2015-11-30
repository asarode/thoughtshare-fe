'use strict'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'
import {
  App,
  Landing,
  ActionModal,
  Create,
  Login,
  PostView
} from './containers'
import createBrowserHistory from 'history/lib/createBrowserHistory'

const ActionRoutes = (
  <Route path='action' component={ActionModal}>
    <Route path='create' component={Create}/>
    <Route path='login' component={Login}/>
  </Route>
)

const Routes = (
  <Router>
    <Redirect from="/" to="/posts"/>
    <Route path='/' component={App}>
      <Route path='/posts/:id' component={PostView}>
        {ActionRoutes}
      </Route>
      <Route path='/posts' component={Landing}>
        {ActionRoutes}
      </Route>
    </Route>
  </Router>
)

export default Routes
