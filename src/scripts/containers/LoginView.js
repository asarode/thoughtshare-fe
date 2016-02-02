import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActs from '../ducks/ui'
import * as authActs from '../ducks/auth'
import { LoginModal } from '../components'

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  uiActs: bindActionCreators(uiActs, dispatch),
  authActs: bindActionCreators(authActs, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginView extends Component {
  render() {
    if (!this.props.ui.getIn(['loginActive'])) return null
    return <LoginModal
      ui={this.props.ui}
      auth={this.props.auth}
      uiActs={this.props.uiActs}
      authActs={this.props.authActs} />
  }
}
