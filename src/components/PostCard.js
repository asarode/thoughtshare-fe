'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import moment from 'moment'
import autobind from 'autobind-decorator'

@autobind
export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static PropTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    createdAt: PropTypes.string.isRequired,
    ups: PropTypes.number.isRequired,
    downs: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired
  }

  static defaultProps = {
    user: {
      username: null,
      id: null
    }
  }

  static contextTypes = {
    router: PropTypes.func
  }

  toPostView() {
    const { props } = this

    props.history.pushState(null, `/posts/${props.id}`)
  }

  render() {
    const { props } = this

    return (
      <div className='ts-Post' onClick={this.toPostView}>
        <div className='ts-Post-cardhead'>
          <div>▲</div>
          <div className='ts-Post-scoretext'>{props.ups - props.downs}</div>
          <div>▼</div>
        </div>
        <div className='ts-Post-cardbody'>
          <div className='ts-Post-title'>
            <div><a href={props.link}>{props.title}</a></div>
            <a className='ts-Post-domain ts-muted'>(domain.com)</a>
          </div>
          <div className='ts-Post-deets ts-muted'>
            <a href='nothing'>{props.user.username}</a> posted {moment(props.createdAt, 'X').fromNow()}
          </div>
        </div>
      </div>
    )
  }
}
