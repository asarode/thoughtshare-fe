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
    authActs: PropTypes.object.isRequired,
    authFlow: PropTypes.func.isRequired,
    registerFlow: PropTypes.func.isRequired,
    closeLogin: PropTypes.func.isRequired
  };

  componentDidMount() {
    document.addEventListener('mouseup', this.handleOverlayClick)
    document.body.classList.add('modal-open')
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleOverlayClick)
    document.body.classList.remove('modal-open')
  }

  render() {
    return <Portal isOpened={this.props.ui.getIn(['loginActive'])}>
      <div className='LoginModal-wrap'>
        <div className='LoginModal-overlay'>
          <div className='LoginModal' ref='modal'>
            <div className='flexrow center-xs group'>
              <div className='col-xs start-xs vmar-spacious vmar-no-top'>
                <h1>Register</h1>
                <div className='form'>
                  <div className='form-row'>
                    <p>Username</p>
                    <input ref='registerUsername' type='text' />
                  </div>
                  <div className='form-row'>
                    <p>Email</p>
                    <input ref='registerEmail' type='text'/>
                  </div>
                  <div className='form-row'>
                    <p>Password</p>
                    <input ref='registerPassword' type='password'/>
                  </div>
                  <div className='form-row end-xs'>
                    <div>
                      <button
                        className='button-heavy'
                        onClick={this.handleRegister}>
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flexrow center-xs LoginModal-group-login group'>
              <div className='col-xs start-xs'>
                <h1>Or just login</h1>
                <div className='form'>
                  <div className='form-row'>
                    {this.props.auth.getIn(['error']).toJS().map((err, i) => {
                      return <p key={i}>{err.detail}</p>
                    })}
                  </div>
                  <div className='form-row'>
                    <p>Username</p>
                    <input ref='loginUsername' type='text' />
                  </div>
                  <div className='form-row'>
                    <p>Password</p>
                    <input ref='loginPassword' type='password' />
                  </div>
                  <div className='form-row end-xs'>
                    <div>
                      <button
                        className='button-heavy'
                        onClick={this.handleLogin}>
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  }

  @autobind
  handleLogin() {
    const username = this.refs.loginUsername.value
    const password = this.refs.loginPassword.value
    this.props.authFlow({ username, password })
  }

  @autobind
  handleRegister() {
    const username = this.refs.registerUsername.value
    const email = this.refs.registerEmail.value
    const password = this.refs.registerPassword.value
    this.props.registerFlow({
      username,
      email,
      password
    })
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
