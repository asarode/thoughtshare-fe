'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import autobind from 'autobind-decorator'

@autobind
export default class DropDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  static PropTypes = {}

  toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { props, state } = this

    return (
      <div className='ts-DropDown' onClick={this.toggleOpen}>
        {props.children} ▾
        <div className={cx('ts-DropDown-menu', {
          'ts-DropDown-menu--open': state.isOpen,
          'ts-DropDown-menu--closed': !state.isOpen
        })}>
          {props.options.map(opt => (
            <div  key={opt.text} className='ts-DropDown-row'>
              <button onClick={opt.action}>{opt.text}</button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
