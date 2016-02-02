import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as thoughtActs from '../ducks/entities/thoughts'
import * as uiActs from '../ducks/ui'
import {
  CreationCallout,
  ThoughtList
} from '../components'

const mapStateToProps = state => ({
  ui: state.ui,
  entities: state.entities,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  thoughtActs: bindActionCreators(thoughtActs, dispatch),
  uiActs: bindActionCreators(uiActs, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeView extends Component {
  render() {
    return <div>
      <CreationCallout
        ui={this.props.ui}
        auth={this.props.auth}
        entities={this.props.entities}
        uiActs={this.props.uiActs}
        history={this.props.history} />
      <ThoughtList 
        ui={this.props.ui}
        entities={this.props.entities}
        thoughtActs={this.props.thoughtActs}
        history={this.props.history} />
    </div>
  }
}
