'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActs from '../modules/auth'
import * as postActs from '../modules/posts'
import autobind from 'autobind-decorator'
import request from 'superagent-bluebird-promise'
import {
  TopBar,
  ExploreBar,
  PostItem,
  ReplyItem
} from '../components'

@connect(state => ({
  auth: state.auth,
  posts: state.posts
}))
@autobind
export default class PostView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reply: {
        title: '',
        link: '',
        desc: ''
      }
    }
    this.authActs = bindActionCreators(authActs, props.dispatch)
    this.postActs = bindActionCreators(postActs, props.dispatch)
  }

  static PropTypes = {}

  componentDidMount() {
    const { props } = this

    const token = localStorage.getItem('token')
    if (token) this.authActs.loginSync(token)
    this.postActs.fetchOnePost(props.params.id)
  }

  linkState(e, link) {
    this.setState({
      reply: {
        ...this.state.reply,
        [link]: e.target.value
      }
    })
  }

  createReply() {
    const { props, state } = this

    request
      .post(`http://localhost:4000/api/posts/${props.params.id}/replies`)
      .set('Authorization', props.auth.token)
      .type('application/json')
      .send(state.reply)
      .then(res => {
        this.postActs.fetchOnePost(props.params.id)
      })
      .catch(err => {
        console.error(err)
      })
  }

  get safeGetPost() {
    const { props } = this
    return props.posts.entities.posts
      ? props.posts.entities.posts[props.params.id]
      : null
  }

  safeGetPostField(...fields) {
    const { props } = this
    const post = this.safeGetPost
    return post
      ? this.fieldFromKeyPath(post, fields)
      : null
  }

  fieldFromKeyPath(obj, field) {
    return field.reduce((agg, curr) => {
      return obj[curr]
    }, obj)
  }

  get safeGetUser() {
    const { props } = this
    const userId = this.safeGetPostField(props.params.id, 'createdBy')
    return userId
     ? props.posts.entities.users[userId]
     : null
  }

  get postItem() {
    const { props } = this
    const post = props.posts.entities.posts[props.params.id]
    if (!post) return null

    const user = props.posts.entities.users[post.createdBy]
    return (
      <PostItem
        post={post}
        user={user}/>
    )
  }

  get replyList() {
    const { props } = this
    const post = props.posts.entities.posts[props.params.id]
    if (!post || !post.replies || post.replies.length === 0) return null

    return post.replies.map(replyId => {
      const reply = props.posts.entities.replies[replyId]
      const user = props.posts.entities.users[reply.createdBy]
      return (
        <ReplyItem
          key={replyId}
          reply={reply}
          user={user}/>
      )
    })
  }

  render() {
    const { props } = this
    const postId = props.params.id
    return (
      <div className='ts-PostView'>
        <TopBar
          location={props.location}
          history={props.history}
          auth={props.auth}
          login={this.authActs.login}
          logout={this.authActs.logout}/>
        <ExploreBar/>
        <div className='ts-PostItem-wrap'>
          {this.postItem}
        </div>
        <div className='ts-ReplyList-wrap'>
          {this.replyList}
        </div>
        <p>Title:</p>
        <input type='text' onChange={(e) => this.linkState(e, 'title')}/>
        <p>Link (optional):</p>
        <input type='text' onChange={(e) => this.linkState(e, 'link')}/>
        <p>Thoughts (optional):</p>
        <textarea onChange={(e) => this.linkState(e, 'desc')}></textarea>
        <button onClick={() => this.createReply()} className='ts-Button'>Submit Reply</button>
        {props.children}
      </div>
    )
  }
}
