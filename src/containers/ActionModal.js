'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import autobind from 'autobind-decorator'

@autobind
export default class ActionModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static PropTypes = {}

  goBack(e) {
    const { refs, props } = this

    if (e.target === ReactDOM.findDOMNode(refs.container)) {
      props.history.goBack()
    }
  }

  render() {
    const { props } = this
    return (
      <div ref='container' className='ts-ActionModal' onClick={this.goBack}>
        <div ref='content' className='ts-ActionModal-content'>
          {props.children}
        </div>
      </div>
    )
  }
}
