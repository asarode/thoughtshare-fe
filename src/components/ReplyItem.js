'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import { ScoreBox, PostInfo } from './index'

export default class ReplyItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static PropTypes = {
    reply: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  render() {
    const { props } = this
    return (
      <div className='ts-ReplyItem'>
        <ScoreBox
          ups={props.reply.ups}
          downs={props.reply.downs}/>
        <div className='ts-ReplyItem-body'>
          <PostInfo
            ups={props.reply.ups}
            downs={props.reply.downs}
            user={props.user.username}
            createdAt={props.reply.createdAt}/>
          <h2 className='ts-ReplyItem-title'>{props.reply.title}</h2>
          <p className='ts-ReplyItem-desc'>{props.reply.desc}</p>
        </div>
      </div>
    )
  }
}
