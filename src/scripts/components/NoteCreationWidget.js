import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'

export default class NoteCreationWidget extends Component {
  static propTypes = {
    isCreatingNote: PropTypes.bool.isRequired,
    createNote: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    requestLogin: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isCreatingNote && !nextProps.isCreatingNote) {
      this.refs.create.disabled = false
    }
  }

  render() {
    return <div className='NoteCreationWidget card'>
      <p className='content-row header'>Add a note</p>
      <div className='form content-row'>
        <div className='form-row row start-xs'>
        </div>
        <div className='form-row row start-xs'>
          <div className='col-xs-12'>
            <p>Link</p>
            <input ref='link' type='text' />
          </div>
        </div>
        <div className='form-row row start-xs'>
          <div className='col-xs-12'>
            <p>Description (optional)</p>
            <textarea ref='description'></textarea>
          </div>
        </div>
        <div className='form-row row end-xs'>
          <div className='col-xs-12'>
            <button
              ref='create'
              className='button-heavy'
              onClick={this.handleCreation}>
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  }

  @autobind
  handleCreation(e) {
    if (!this.props.isLoggedIn) {
      this.props.requestLogin()
      return
    }

    e.target.disabled = true

    const link = this.refs.link.value
    const description = this.refs.description.value
    this.props.createNote({ link, description })
  }
}
