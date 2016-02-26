import React, { Component } from 'react'
import { TopbarView, LoginView } from '.'

export default class App extends Component {

  render() {
    return <div>
      <TopbarView history={this.props.history}/>
      <div className='MainView'>
        { this.props.children }
      </div>
      <LoginView />
    </div>
  }
}
