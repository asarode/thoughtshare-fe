import React, { Component, PropTypes } from 'react'
import moment from 'moment'

export default class ThoughtList extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    entities: PropTypes.object.isRequired,
    thoughtActs: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.thoughtActs.fetchList()
  }

  render() {
    const thoughts = this.props.entities.thoughts.getIn(['docs']).toJS()
    const thoughtIds = Object.keys(thoughts)
    return <div className='ThoughtList row'>
      <div className='col-xs-12
                      col-sm-10
                      col-md-8
                      col-lg-6'>
        {
          thoughtIds.map(id => {
            const thought = thoughts[id]
            return <ThoughtCard
              key={id}
              thought={thought}
              history={this.props.history} />
          })
        }
      </div>
    </div>
  }
}

const ThoughtCard = ({ thought, history }) => (
  <div
    className='ThoughtCard card'
    onClick={() => history.pushState(null, `/thoughts/${thought.id}`)}>
    <div className='header content-row'>
      {thought.title}
    </div>
    <div className='body content-row'>
      {thought.desc}
    </div>
    <div className='details content-row'>
      Posted {moment(thought.created_at).fromNow()} by {thought.creator.username}
    </div>
  </div>
)
