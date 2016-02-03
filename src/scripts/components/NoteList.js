import React, { Component, PropTypes } from 'react'
import { NoteCard } from '.'

export default class NoteList extends Component {
  static propTypes = {
    hasNotesData: PropTypes.bool.isRequired,
    notes: PropTypes.array
  };
  
  render() {
    if (!this.props.hasNotesData) {
      return <div>Loading...</div>
    }

    console.log(this.props.notes)
    const noteNodes = this.props.notes
      .map(note => (<NoteCard key={note.id} note={note} />))

    return <div className='NoteList'>
      {noteNodes}
    </div>
  }
}
