'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import { LoginWidget } from './index'

export default class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static PropTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  render() {
    const { props } = this

    return (
      <div className='ts-TopBar'>
        <div className='ts-TopBar-left'>
          <img className='ts-TopBar-logo' src='src/assets/logo.png' alt='logo'/>
          <h2 className='ts-TopBar-brandname'>ThoughtShare</h2>
        </div>
        <div className='ts-TopBar-center'>
          <button onClick={() => props.history.pushState(null, `${props.location.pathname}/action/create`)} className='ts-Button--major ts-TopBar-Button ts-Button'>
            CREATE
          </button>
        </div>
        <div className='ts-TopBar-right'>
          <LoginWidget
            location={props.location}
            history={props.history}
            auth={props.auth}
            login={props.login}
            logout={props.logout}/>
        </div>
      </div>
    )
  }
}
