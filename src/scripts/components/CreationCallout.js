import React, { Component, PropTypes } from 'react'

export default class CreationCallout extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    entities: PropTypes.object.isRequired,
    uiActs: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    return <div className='CreationCallout card'>
      <div className='content-row'>
        <h1 className='heading'>Add your own thought!</h1>
      </div>
      <div className='content-row'>
        <button
          className='button-heavy'
          onClick={() => this.handleCreationClick()}>
          Create
        </button>
      </div>
    </div>
  }

  handleCreationClick() {
    if (!this.props.auth.getIn(['currentUser'])) {
      this.props.uiActs.openLogin()
    } else {
      this.props.history.pushState(null, '/create')
    }
  }
}
