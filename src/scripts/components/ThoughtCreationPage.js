import React, { Component, PropTypes } from 'react'

export default class ThoughtCreationPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    uiActs: PropTypes.object.isRequired,
    thoughtActs: PropTypes.object.isRequired
  };

  render() {
    return <div className='ThoughtCreationPage'>
      <div>
        <label>Title</label>
        <input ref='title'/>
      </div>
      <div>
        <label>Description</label>
        <input ref='description'/>
      </div>
      <div>
        <button onClick={() => this.handleCreate()}>CREATE</button>
      </div>
    </div>
  }

  handleCreate() {
    this.props.thoughtActs.create({
      token: this.props.auth.getIn(['token']),
      title: this.refs.title.value,
      description: this.refs.description.value
    })
  }
}
