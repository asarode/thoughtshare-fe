import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import {
  CurrentThoughtWidget,
  NoteCreationWidget,
  GroupCreationWidget,
  NoteList
} from '.'

export default class ThoughtPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      curate: false
    }
  }

  static propTypes = {
    hasThoughtData: PropTypes.bool.isRequired,
    thought: PropTypes.object,
    hasRelatedGroupsData: PropTypes.bool,
    relatedGroups: PropTypes.array,
    hasNotesData: PropTypes.bool.isRequired,
    notes: PropTypes.array,
    goToGroup: PropTypes.func.isRequired,
    isCreatingNote: PropTypes.bool.isRequired,
    createNote: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    requestLogin: PropTypes.func.isRequired,
    createGroup: PropTypes.func.isRequired
  };

  render() {
    if (!this.props.hasThoughtData) {
      return <div className='row center-xs'>Loading...</div>
    }

    return <div>
      <div className='row center-xs'>
        <div className='col-xs-12 col-sm-10 col-md-8 col-lg-6 start-xs'>
          <CurrentThoughtWidget
            hasThoughtData={this.props.hasThoughtData}
            thought={this.props.thought}
            hasRelatedGroupsData={this.props.hasRelatedGroupsData}
            relatedGroups={this.props.relatedGroups}
            hasNotesData={this.props.hasNotesData}
            notes={this.props.notes}
            goToGroup={this.props.goToGroup} />
        </div>
      </div>
      <div className='row center-xs'>
        <div className='col-xs-12 col-sm-10 col-md-8 col-lg-6 start-xs'>
          <GroupCreationWidget
            isOwner={this.props.isOwner}
            isLoggedIn={this.props.isLoggedIn}
            requestLogin={this.props.requestLogin}
            createGroup={this.props.createGroup} />
        </div>
      </div>
      <div className='row center-xs'>
        <div className='col-xs-12 col-sm-10 col-md-8 col-lg-6 start-xs'>
          <NoteCreationWidget
            isCreatingNote={this.props.isCreatingNote}
            createNote={this.props.createNote}
            isLoggedIn={this.props.isLoggedIn}
            requestLogin={this.props.requestLogin} />
        </div>
      </div>
      <div className='row center-xs'>
        <div className='col-xs-12 col-sm-10 col-md-8 col-lg-6 start-xs'>
          <NoteList
            hasNotesData={this.props.hasNotesData}
            notes={this.props.notes} />
        </div>
      </div>
    </div>
  }

  @autobind
  toggleCurate() {
    this.setState({
      curate: !this.state.curate
    })
  }
}
