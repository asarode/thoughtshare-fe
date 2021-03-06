import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LoginModal } from '../components'
import * as uiActs from '../ducks/ui'
import * as authActs from '../ducks/auth'
import { Topbar } from '../components'
import { logoutFlow, processTokenFlow } from '../actionCreators'

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  uiActs: bindActionCreators(uiActs, dispatch),
  authActs: bindActionCreators(authActs, dispatch),
  logoutFlow: bindActionCreators(logoutFlow, dispatch),
  processTokenFlow: bindActionCreators(processTokenFlow, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class TopbarView extends Component {

  componentWillMount() {
    this.props.processTokenFlow()
  }

  render() {
    return <Topbar
      history={this.props.history}
      ui={this.props.ui}
      auth={this.props.auth}
      uiActs={this.props.uiActs}
      authActs={this.props.authActs}
      logoutFlow={this.props.logoutFlow} />
  }
}
