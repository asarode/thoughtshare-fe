import React, { Component, PropTypes } from 'react'
import moment from 'moment'

export default class NoteCard extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired
  };

  render() {
    const note = this.props.note.toJS()
    return <div className='NoteCard card'>
      <div className='content-row header'>
        <a href={note.link} className='clickable'>{note.link}</a>
      </div>
      <div className='content-row content'>
        <p>{note.desc}</p>
      </div>
      <div className='content-row details'>
        <p>Posted {moment(note.created_at).fromNow()} by note.creator</p>
      </div>
    </div>
  }
}
