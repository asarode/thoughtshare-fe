import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActs from '../ducks/ui'
import { groupActs, noteActs } from '../ducks/entities'
import autobind from 'autobind-decorator'
import { ThoughtPage } from '../components'


const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  entities: state.entities
})

const mapDispatchToProps = dispatch => ({
  uiActs: bindActionCreators(uiActs, dispatch),
  groupActs: bindActionCreators(groupActs, dispatch),
  noteActs: bindActionCreators(noteActs, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class ThoughtView extends Component {
  componentWillMount() {
    this.props.groupActs.fetchOne(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.groupActs.fetchOne(nextProps.params.id)
    }
  }

  render() {
    const { id } = this.props.params
    return <ThoughtPage
      hasThoughtData={this.hasThoughtData}
      thought={this.loadedThoughtData}
      hasRelatedGroupsData={this.hasRelatedGroupsData}
      relatedGroups={this.loadedRelatedGroupsData}
      hasNotesData={this.hasNotesData}
      notes={this.loadedNotesData}
      goToGroup={this.goToGroup}
      isCreatingNote={this.isCreatingNote}
      createNote={this.createNote}
      isLoggedIn={this.isLoggedIn}
      requestLogin={this.requestLogin}
      createGroup={this.createGroup} />
  }

  get hasThoughtData() {
    return Boolean(this.props.entities.groups
      .getIn(['meta', this.props.params.id, 'fullyLoaded']))
  }

  get loadedThoughtData() {
    if (!this.hasThoughtData) return

    return this.thoughtData(this.props)
  }

  thoughtData(props) {
    return props.entities.groups
      .getIn(['docs', props.params.id])
      .toJS()
  }

  get hasNotesData() {
    if (!this.hasThoughtData) return false

    const noteIds = this.props.entities.groups
      .getIn(['docs', this.props.params.id, 'notes'])
      .toJS()

    return noteIds
      .every(id =>
        this.props.entities.notes.getIn(['meta', id, 'fullyLoaded']))
  }

  get loadedNotesData() {
    if (!this.hasNotesData) return

    return this.notesData(this.props)
  }

  notesData(props) {
    return props.entities.groups
      .getIn(['docs', props.params.id, 'notes'])
      .toJS()
      .map(id =>
        props.entities.notes
          .getIn(['docs', id])
          .toJS())
  }

  get hasRelatedGroupsData() {
    if (!this.hasThoughtData) return false

    const groupIds = this.props.entities.groups
      .getIn(['docs', this.props.params.id, 'groups'])
      .toJS()

    return !groupIds
      .find(id =>
        !this.props.entities.groups
          .hasIn(['docs', id]))
  }

  get loadedRelatedGroupsData() {
    if (!this.hasRelatedGroupsData) return

    return this.relatedGroupsData(this.props)
  }

  relatedGroupsData(props) {
    return props.entities.groups
      .getIn(['docs', props.params.id, 'groups'])
      .toJS()
      .map(id =>
        props.entities.groups
          .getIn(['docs', id])
          .toJS())
  }

  @autobind
  fetchThought() {
    return this.props.groupActs.fetchOne(this.props.params.id)
  }

  @autobind
  goToGroup(id) {
    this.props.history.pushState(null, `/thoughts/${id}`)
  }

  get isLoggedIn() {
    return Boolean(this.props.auth.getIn(['token']))
  }

  @autobind
  requestLogin() {
    this.props.uiActs.openLogin()
  }

  @autobind
  createNote({ link, description }) {
    const token = this.props.auth.getIn(['token'])
    const groupId = this.props.params.id
    this.props.noteActs.create({ token, groupId, link, description })
  }

  @autobind
  createGroup({ title, description }) {
    const token = this.props.auth.getIn(['token'])
    const groupId = this.props.params.id
    this.props.groupActs.create({ token, groupId, title, description })
  }

  get isCreatingNote() {
    return this.props.entities.notes.getIn(['isLoadingCreate'])
  }
}
