'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Link } from 'react-router'
import cx from 'classname'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActs from '../modules/auth'
import * as postActs from '../modules/posts'
import {
  LoginWidget,
  TopBar,
  Post
} from '../components'

@connect(state => ({
  auth: state.auth,
  posts: state.posts
}))
export default class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.authActs = bindActionCreators(authActs, props.dispatch)
    this.postActs = bindActionCreators(postActs, props.dispatch)
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) this.authActs.loginSync(token)
    this.postActs.fetchPosts()
  }

  get posts() {
    const { props } = this

    return props.posts.results.map(postId => {
      let post = props.posts.entities.posts[postId]
      post.createdBy = props.posts.entities.users[post.createdBy]
      return <Post
        key={postId}
        id={post.id}
        title={post.title}
        link={'http://facebook.com'}
        desc={post.desc}
        user={post.createdBy}
        createdAt={post.createdAt}
        ups={post.ups}
        downs={post.downs}
        history={props.history}/>
    })
  }

  render() {
    const { props } = this

    return (
      <div>
        <TopBar
          location={props.location}
          history={props.history}
          auth={props.auth}
          login={this.authActs.login}
          logout={this.authActs.logout}/>
        <div>
          {this.posts}
        </div>
        {props.children}
      </div>
    )
  }
}
