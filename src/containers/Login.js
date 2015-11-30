'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActs from '../modules/auth'
import autobind from 'autobind-decorator'

@connect(state => ({
  auth: state.auth
}))
@autobind
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: {
        username: '',
        password: ''
      },
      showRegistration: false
    }
    this.authActs = bindActionCreators(authActs, props.dispatch)
  }

  static PropTypes = {
    login: PropTypes.func.isRequired
  }

  linkState(e, link) {
    this.setState({
      auth: {
        ...this.state.auth,
        [link]: e.target.value
      }
    })
  }

  login() {
    const { state } = this

    this.authActs.login(state.auth.username, state.auth.password)
  }

  render() {
    const { props } = this

    return (
      <div>
        <h1 className='ts-ActionModal-header'>Welcome Back</h1>
        <div className='ts-ActionModal-inputrow'>
          <p>Username:</p>
          <input type='text' onChange={e => this.linkState(e, 'username')}/>
        </div>
        <div className='ts-ActionModal-inputrow'>
          <p>Password:</p>
          <input type='password' onChange={e => this.linkState(e, 'password')}/>
        </div>
        <div className='ts-ActionModal-inputrow'>
          <button onClick={this.login} className='ts-Button'>Login</button>
        </div>
      </div>
    )
  }
}
