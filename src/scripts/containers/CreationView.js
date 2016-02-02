import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActs from '../ducks/ui'
import { thoughtActs } from '../ducks/entities'
import { ThoughtCreationPage } from '../components'

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  uiActs: bindActionCreators(uiActs, dispatch),
  thoughtActs: bindActionCreators(thoughtActs, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class CreationView extends Component {
  render() {
    return <ThoughtCreationPage
      auth={this.props.auth}
      uiActs={this.props.uiActs}
      thoughtActs={this.props.thoughtActs} />
  }
}
