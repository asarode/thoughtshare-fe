import React, { Component, PropTypes } from 'react'
import {
  CurrentThoughtWidget,
  NoteList
} from '.'

export default class ThoughtPage extends Component {
  static propTypes = {
    hasThoughtData: PropTypes.bool.isRequired,
    thought: PropTypes.object,
    hasRelatedGroupsData: PropTypes.bool,
    relatedGroups: PropTypes.array,
    hasNotesData: PropTypes.bool.isRequired,
    notes: PropTypes.array,
    goToGroup: PropTypes.func.isRequired
  };

  render() {
    if (!this.props.hasThoughtData) {
      return <div>Loading...</div>
    }

    return <div>
      <div className='row'>
        <div className='col-xs-12 col-sm-10 col-md-8 col-lg-6'>
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
      <div className='row'>
        <div className='col-xs-12'>
          <NoteList
            hasNotesData={this.props.hasNotesData}
            notes={this.props.notes} />
        </div>
      </div>
    </div>
  }
}
