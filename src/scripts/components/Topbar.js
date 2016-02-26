import React, { Component, PropTypes } from 'react'

export default class Topbar extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    uiActs: PropTypes.object.isRequired,
    authActs: PropTypes.object.isRequired,
    logoutFlow: PropTypes.func.isRequired
  };

  render() {
    const currentUser = this.props.auth.getIn(['docs', 'currentUser'])
    return <div className='Topbar middle-xs between-xs'>
      <div
        id='nav-logo'
        className='col-xs'
        onClick={() => this.props.history.pushState(null, '')}>
        ThoughtShare
      </div>
      <div className='col-xs end-xs'>
        <div className='item'>
          {
            currentUser
            ? this.loggedInItem(currentUser.toJS())
            : this.loggedOutItem
          }
        </div>
      </div>
    </div>
  }

  loggedInItem(currentUser) {
    return <span>
      Hello, {currentUser.username}
      <button className='button-light' onClick={() => this.props.logoutFlow()}>Logout</button>
    </span>
  }

  get loggedOutItem() {
    return <button className='button-light' onClick={() => this.props.uiActs.openLogin()}>Login</button>
  }
}
