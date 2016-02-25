import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActs from '../ducks/ui'
import * as authActs from '../ducks/auth'
import { authFlow, registerFlow, closeLogin } from '../actionCreators'
import { LoginModal } from '../components'

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  uiActs: bindActionCreators(uiActs, dispatch),
  authActs: bindActionCreators(authActs, dispatch),
  authFlow: bindActionCreators(authFlow, dispatch),
  registerFlow: bindActionCreators(registerFlow, dispatch),
  closeLogin: bindActionCreators(closeLogin, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginView extends Component {
  render() {
    if (!this.props.ui.get('loginActive')) return null
    return <LoginModal
      ui={this.props.ui}
      auth={this.props.auth}
      uiActs={this.props.uiActs}
      authActs={this.props.authActs}
      authFlow={this.props.authFlow}
      registerFlow={this.props.registerFlow}
      closeLogin={this.props.closeLogin} />
  }
}
