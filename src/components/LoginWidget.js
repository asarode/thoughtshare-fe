'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import {
  DropDown
} from './index'

export default class LoginWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static PropTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  get viewLoggedIn() {
    const { props } = this

    const dropDownOptions = [
    {
      text: 'View Profile',
      action: () => { console.log('view profile')}
    },
    {
      text: 'Logout',
      action: props.logout
    }]
    return (
      <DropDown options={dropDownOptions}>
        @{props.auth.currentUser.username}
      </DropDown>
    )
  }

  get viewLoggedOut() {
    const { props } = this
    return (
      <button onClick={() => props.history.pushState(null, `${props.location.pathname}/action/login`)} className='ts-Button'>Login</button>
    )
  }

  render() {
    const { props } = this

    return (
      <div className='ts-LoginWidget'>
        {props.auth && props.auth.currentUser
          ? this.viewLoggedIn
          : this.viewLoggedOut}
      </div>
    )
  }
}
