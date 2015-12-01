'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'

export default class ExploreBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static PropTypes = {}

  render() {
    return (
      <div className='ts-ExploreBar'>
        <div className='ts-ExploreBar-crumbs'>
          <span>Title of the...</span> › <span>The next post...</span> › <span>Direct parent...</span>
        </div>
        <button className='ts-Button'>EXPLORE</button>
      </div>
    )
  }
}
