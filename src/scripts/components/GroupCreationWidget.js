import React, { Component } from 'react'
import autobind from 'autobind-decorator'

export default class GroupCreationWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }
  }

  render() {
    return <div className='GroupCreationWidget'>
      {this.openButton}
      {this.creationForm}
    </div>
  }

  get openButton() {
    if (this.state.active) return

    return <button className='button-heavy' onClick={this.handleOpen}>
      Create New Branch
    </button>
  }

  get creationForm() {
    if (!this.state.active) return

    return <div className='card'>
      <p className='content-row header'>Create a branch</p>
      <form className='content-row'>
        <div className='form-row row start-xs'>
          <div className='col-xs-12'>
            <p>Title</p>
            <input ref='title' type='text' />
          </div>
        </div>
        <div className='form-row row start-xs'>
          <div className='col-xs-12'>
            <p>Description (optional)</p>
            <textarea ref='description'></textarea>
          </div>
        </div>
        <div className='form-row row start-xs'>
          <div className='col-xs'>
            <button
              ref='create'
              className='button-heavy'
              onClick={() => this.handleCreation()}>
              Create
            </button>
            <button
              ref='create'
              className='button-light'
              onClick={() => this.setState({ active: false })}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  }

  @autobind
  handleOpen() {
    if (!this.props.isLoggedIn) {
      this.props.requestLogin()
      return
    }

    this.setState({
      active: true
    })
  }

  @autobind
  handleCreation() {
    const title = this.refs.title.value
    const description = this.refs.description.value

    this.props.createGroup({ title, description })
  }
}
