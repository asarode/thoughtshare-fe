'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'
import cx from 'classname'
import { ScoreBox, PostInfo } from './index'

export default class PostItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static PropTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  render() {
    const { props } = this

    return (
      <div className='ts-PostItem'>
        <ScoreBox
          ups={0}
          downs={0}/>
        <div className='ts-PostItem-body'>
          <PostInfo
            user={props.user.username}
            createdAt={props.post.createdAt}/>
          <h2 className='ts-PostItem-title'>{props.post.title}</h2>
          <p className='ts-PostItem-desc'>{props.post.desc}</p>
        </div>
      </div>
    )
  }
}
