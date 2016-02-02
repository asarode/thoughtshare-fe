import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Portal from 'react-portal'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'

export default class LoginModal extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    uiActs: PropTypes.object.isRequired,
    authActs: PropTypes.object.isRequired
  };

  componentDidMount() {
    document.addEventListener('mouseup', this.handleOverlayClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleOverlayClick)
  }

  render() {
    return <Portal isOpened={this.props.ui.getIn(['loginActive'])}>
      <div className='LoginModal-overlay'>
        <div className='LoginModal' ref='modal'>
          <div>
            <label>Username</label>
            <input ref='username' />
          </div>
          <div>
            <label>Password</label>
            <input ref='password' type='password' />
          </div>
          <div>
            <button onClick={() => this.handleLogin()}>LOGIN</button>
          </div>
          {
            this.props.auth.getIn(['error']).toJS().map((err, i) => {
              console.log(err)
              return <p key={i}>{err.detail}</p>
            })
          }
        </div>
      </div>
    </Portal>
  }

  @autobind
  handleLogin() {
    this.props.authActs.login(this.refs.username.value, this.refs.password.value)
  }

  @autobind
  handleOverlayClick(e) {
    if (this.isNodeInRoot(e.target, findDOMNode(this.refs.modal))) {
      return
    }
    e.stopPropagation()
    this.props.uiActs.closeLogin()
  }

  isNodeInRoot(node, root) {
    while (node) {
      if (node === root) {
        return true
      }
      node = node.parentNode
    }
    return false
  }
}
