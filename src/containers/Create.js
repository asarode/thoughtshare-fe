'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import request from 'superagent-bluebird-promise'
import * as authActs from '../modules/auth'

@autobind
@connect(state => ({
  auth: state.auth
}))
export default class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {
        title: '',
        link: '',
        desc: ''
      }
    }
    this.authActs = bindActionCreators(authActs, props.dispatch)
  }

  static PropTypes = {}

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) this.authActs.loginSync(token)
  }

  linkState(e, link) {
    this.setState({
      post: {
        ...this.state.post,
        [link]: e.target.value
      }
    })
  }

  createPost() {
    const { props, state } = this

    request
      .post('http://localhost:4000/api/posts')
      .set('Authorization', props.auth.token)
      .type('application/json')
      .send(state.post)
      .then(res => {
        props.history.goBack()
      })
      .catch(err => {
        console.error(err)
      })
  }

  get username() {
    const { props } = this

    return props.auth.currentUser
      ? `${props.auth.currentUser.username} (you)`
      : 'you need to login to create a post'
  }

  render() {
    const { props } = this

    return (
      <div>
        <h1 className='ts-ActionModal-header'>Create New Post</h1>
        <div className='ts-ActionModal-inputrow'>
          <p>Title of your post:</p>
          <input type='text' onChange={(e) => this.linkState(e, 'title')}/>
        </div>
        <div className='ts-ActionModal-inputrow'>
          <p>Link (optional):</p>
          <input type='text' onChange={(e) => this.linkState(e, 'link')}/>
        </div>
        <div className='ts-ActionModal-inputrow'>
          <p>Other thoughts:</p>
          <textarea onChange={(e) => this.linkState(e, 'desc')}></textarea>
        </div>
        <div className='ts-ActionModal-inputrow'>
          <p>Curators:</p>
          <ul>
            <li>{this.username}</li>
          </ul>
        </div>
        <div className='ts-ActionModal-inputrow'>
          <button onClick={() => this.createPost()} className='ts-Button'>CREATE NEW POST</button>
        </div>
      </div>
    )
  }
}
