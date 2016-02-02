import React, { Component, PropTypes } from 'react'
import { NoteCard } from '.'

export default class NoteList extends Component {
  static propTypes = {
    notes: PropTypes.object.isRequired,
    ids: PropTypes.array.isRequired
  };
  
  render() {
    const { notes, ids } = this.props
    if (
      ids.find(id => !notes.hasIn(['docs', id]))
      || notes.getIn(['isLoadingList'])
    ) {
      return <div>Loading...</div>
    }

    return <div className='NoteList'>
      {ids.map(id => {
        return <NoteCard key={id} note={notes.getIn(['docs', id])} />
      })}
    </div>
  }
}
