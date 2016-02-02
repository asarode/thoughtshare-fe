import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActs from '../ducks/ui'
import { groupActs } from '../ducks/entities'
import { ThoughtPage } from '../components'


const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  entities: state.entities
})

const mapDispatchToProps = dispatch => ({
  uiActs: bindActionCreators(uiActs, dispatch),
  groupActs: bindActionCreators(groupActs, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class ThoughtView extends Component {
  render() {
    const { id } = this.props.params
    return <div>
      <ThoughtPage
        id={id}
        ui={this.props.ui}
        auth={this.props.auth}
        entities={this.props.entities}
        history={this.props.history}
        uiActs={this.props.uiActs}
        groupActs={this.props.groupActs} />
    </div>
  }
}
