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
    return <div className='CurrentThoughtWidget card'>
      <div className='header content-row'>
        <p>Title: {thought.title}</p>
      </div>
      <div className='body content-row'>
        <p>Description: {thought.desc}</p>
      </div>
      <div className='details content-row'>
        <p>Posted {moment(thought.created_at).fromNow()} by {thought.creator.username}</p>
      </div>
      <div className='content-row'>
        {this.relatedGroups}
      </div>
    </div>
  }

  get relatedGroups() {
    if (!this.props.hasRelatedGroupsData) {
      return <div>Loading...</div>
    }

    return <RelatedGroupsWidget
      groups={this.props.relatedGroups}
      goToGroup={this.props.goToGroup} />
  }
}
