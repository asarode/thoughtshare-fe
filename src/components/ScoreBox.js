'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'

export default class ScoreBox extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static PropTypes = {
    ups: PropTypes.number.isRequired,
    downs: PropTypes.number.isRequired
  }

  get score() {
    const { props } = this
    
    if (typeof props.ups !== 'number' || typeof props.downs !== 'number') {
      return null
    }
    return (
      <div className='ts-ScoreBox-score'>{props.ups - props.downs}</div>
    )
  }

  render() {
    const { props } = this

    return (
      <div className='ts-ScoreBox'>
        <div className='ts-ScoreBox-arrow'>▲</div>
        {this.score}
        <div className='ts-ScoreBox-arrow'>▼</div>
      </div>
    )
  }
}
