import React, { Component, PropTypes } from 'react'
import cx from 'classname'
import moment from 'moment'

import { RelatedGroupsWidget } from '.'

export default class CurrentThoughtWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      affixWidget: true
    }
  }

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
    const { thought } = this.props
    return <div className='CurrentThoughtWidget card-group vmar-normal'>
      <div className='card'>
        <div className='header content-row'>
          <h3>{thought.title}</h3>
        </div>
        <div className='body content-row'>
          <p>{thought.desc}</p>
        </div>
        <div className='details content-row'>
          <p>Posted {moment(thought.created_at).fromNow()} by {thought.creator.username}</p>
        </div>
      </div>
      <div className='card card-muted'>
        {this.relatedGroups}
      </div>
    </div>
  }

  get relatedGroups() {
    if (!this.props.hasRelatedGroupsData) {
      return <div className='row center-xs'>Loading...</div>
    }

    return <RelatedGroupsWidget
      groups={this.props.relatedGroups}
      goToGroup={this.props.goToGroup} />
  }
}
