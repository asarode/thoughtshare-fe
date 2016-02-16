import React, { Component } from 'react'

export default class RelatedGroupsWidget extends Component {
  render() {
    return <div ref='widget' className='RelatedGroupsWidget'>
      {this.props.groups.length > 0
        ? this.content
        : this.empty}
    </div>
  }

  get empty() {
    return <div className='vmar-normal vmar-no-top'>
      <p>No related topics</p>
    </div>
  }

  get content() {
    return <div className='vmar-normal vmar-no-top'>
      <p>Related:</p>
      <ul className='related-list'>
        {this.groupNodes}
      </ul>
    </div>
  }

  get groupNodes() {
    return this.props.groups.map((group, i) => {
      return <li
        key={group.id}
        className='related-item vmar-compact'
        onClick={() => this.props.goToGroup(group.id)}>
        <span title={group.title} className='clickable'>{group.title}</span>
      </li>
    })
  }
}
