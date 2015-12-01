'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import moment from 'moment'

export default class PostInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static PropTypes = {
    user: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    ups: PropTypes.number,
    downs: PropTypes.number
  }

  buildData(display) {
    return (
      <span className='ts-PostInfo-data'>{display}</span>
    )
  }

  get userData() {
    const { props } = this
    return this.buildData(`@${props.user}`)
  }

  get scoreData() {
    const { props } = this
    if (props.ups === undefined || typeof props.downs === undefined) {
      return null
    }
    const score = props.ups - props.downs
    const pointString = score !== 1 ? 'points' : 'point'
    return this.buildData(`${score} ${pointString}`)
  }

  get dateData() {
    const { props } = this
    const dateString = moment(props.createdAt, 'X').fromNow()
    return this.buildData(dateString)
  }

  render() {
    const { props } = this

    return (
      <div className='ts-PostInfo'>
        {this.userData}
        {this.scoreData}
        {this.dateData}
      </div>
    )
  }
}
