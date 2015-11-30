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
import { TopBar } from '../components'

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

  render() {
    const { props } = this
    const postId = props.params.id
    return (
      <div>
        <TopBar
          location={props.location}
          history={props.history}
          auth={props.auth}
          login={this.authActs.login}
          logout={this.authActs.logout}/>
        <p>Title:</p>
        <input type='text' onChange={(e) => this.linkState(e, 'title')}/>
        <p>Link (optional):</p>
        <input type='text' onChange={(e) => this.linkState(e, 'link')}/>
        <p>Thoughts (optional):</p>
        <textarea onChange={(e) => this.linkState(e, 'desc')}></textarea>
        <button onClick={() => this.createReply()} className='ts-Button'>Submit Reply</button>

        <pre>{JSON.stringify(props.posts.entities.posts ? props.posts.entities.posts[postId] : {}, null, 2)}</pre>
        {props.children}
      </div>
    )
  }
}
