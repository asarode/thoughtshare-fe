import React from 'react'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'
// import createBrowserHistory from 'history/lib/createBrowserHistory'
import {
  App,
  Sink,
  HomeView,
  CreationView,
  ThoughtView
} from './containers'

const AppRouter = (
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={HomeView} />
      <Route path='/create' component={CreationView} />
      <Route path='/thoughts/:id' component={ThoughtView} />
    </Route>
    <Route path='/sink' component={Sink} />
  </Router>
)

export default AppRouter
