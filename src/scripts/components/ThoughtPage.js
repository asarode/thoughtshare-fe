import React, { Component, PropTypes } from 'react'
import {
  CurrentThoughtWidget,
  NoteList
} from '.'

export default class ThoughtPage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    ui: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    entities: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    uiActs: PropTypes.object.isRequired,
    groupActs: PropTypes.object.isRequired
  };

  componentWillMount() {
    if (!this.props.entities.groups.getIn(['isLoading'])) {
      this.props.groupActs.fetchOne(this.props.id)
    }
  }

  componentWillReceiveProps(next) {
    if (this.props.id !== next.id) {
      next.groupActs.fetchOne(next.id)
    }
  }

  render() {
    if (
      !this.props.entities.groups.getIn(['meta', this.props.id, 'fullyLoaded'])
      || this.props.entities.groups.getIn(['isLoading'])) {
      return <div>Loading...</div>
    }
    const currentGroup = this.props.entities.groups.getIn(['docs', this.props.id])
    const relatedIds = this.props.entities.groups.getIn(['docs', this.props.id, 'groups']).toJS()
    return <div>
      <div className='row'>
        <div className='col-xs-12
                        col-sm-10
                        col-md-8
                        col-lg-6'>
          <CurrentThoughtWidget
            history={this.props.history}
            groups={this.props.entities.groups}
            thought={currentGroup}
            relatedIds={relatedIds} />
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12'>
          <NoteList
            notes={this.props.entities.notes}
            ids={this.props.entities.groups.getIn(['docs', this.props.id, 'notes']).toJS()} />
        </div>
      </div>
    </div>
  }
}
