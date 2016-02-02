import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import autobind from 'autobind-decorator'

export default class CurrentThoughtWidget extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    thought: PropTypes.object.isRequired,
    relatedIds: PropTypes.array.isRequired
  };

  render() {
    const { groups, thought, relatedIds } = this.props
    const thoughtObj = thought.toJS()
    return <div className='CurrentThoughtWidget card'>
      <div className='header content-row'>
        <p>Title: {thoughtObj.title}</p>
      </div>
      <div className='body content-row'>
        <p>Description: {thoughtObj.desc}</p>
      </div>
      <div className='details content-row'>
        <p>Posted {moment(thoughtObj.created_at).fromNow()} by {thoughtObj.creator.username}</p>
      </div>
      <div className='content-row'>
        {this.loadRelatedGroups}
      </div>
    </div>
  }

  get loadRelatedGroups() {
    const { groups, relatedIds, history } = this.props
    if (
      groups.getIn(['isLoadingList'])
      || relatedIds.find(id => !groups.hasIn(['docs', id]))
    ) {
      return <div>Loading...</div>
    } else {
      return <RelatedGroupsWidget
        groups={relatedIds.map(this.getDoc)}
        history={history} />
    }
  }

  @autobind
  getDoc(id) {
    return this.props.groups.getIn(['docs', id])
  }
}

const RelatedGroupsWidget = ({ groups, history }) => {
  return <div className='RelatedGroupsWidget'>
    {
      groups.map(g => {
        const group = g.toJS()
        return <div
          key={group.id}
          className='related-item'
          onClick={() => history.pushState(null, `/thoughts/${group.id}`)}>
          <p className='clickable'>{group.title}</p>
        </div>
      })
    }
  </div>
}
