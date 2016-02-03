import React, { Component, PropTypes } from 'react'

export default class ThoughtCreationPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    uiActs: PropTypes.object.isRequired,
    thoughtActs: PropTypes.object.isRequired
  };

  render() {
    return <div className='row center-xs'>
      <form className='ThoughtCreationPage col-xs-12
                                           col-sm-10
                                           col-md-8
                                           col-lg-6'>
        <div className='form-row row start-xs'>
          <div className='col-xs-12'>
            <p>Title</p>
            <input type='text' ref='title'/>
          </div>
        </div>
        <div className='form-row row start-xs'>
          <div className='col-xs-12'>
            <p>Description</p>
            <textarea ref='description'></textarea>
          </div>
        </div>
        <div className='form-row row start-xs'>
          <div className='col-xs-12'>
            <button
              className='button-heavy'
              onClick={() => this.handleCreate()}>
              CREATE
            </button>
          </div>
        </div>
      </form>
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
