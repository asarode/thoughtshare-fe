import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import R from 'ramda'

export default class RelatedGroupsWidget extends Component {
  constructor(props) {
    super(props)

    this.groupElems = {}
    this.state = {
      visibleGroups: this.props.groups.length
    }
  }

  componentDidMount() {
    console.log(this.groupElems)
    const widths = Object.keys(this.groupElems).map(key => {
      return this.groupElems[key].offsetWidth
    })
    
    let fittingGroups = 0
    let totalWidth = 0
    Object.keys(this.groupElems).forEach(key => {
      totalWidth += this.groupElems[key].offsetWidth
      if (totalWidth < this.refs.widget.offsetWidth) {
        fittingGroups++
      }
    })
    console.log(widths)
    console.log(fittingGroups)
  }

  render() {
    const { groups, goToGroup } = this.props

    const previewTitle = title => {
      const cutoff = 20
      if (title.length < cutoff) return title
      const visibleChars = R.take(cutoff, title.split(''))
      return `${visibleChars.join('')}...`
    }

    const groupsCutoff = this.state.visibleGroups
    const groupNodes = R.take(groupsCutoff, groups).map((group, i) => {
      return <div
        ref={c => this.groupElems[i] = c}
        style={{whiteSpace: 'nowrap'}}
        key={group.id}
        className='related-item'
        onClick={() => goToGroup(group.id)}>
        <p title={group.title} className='clickable'>{group.title}</p>
      </div>
    })

    const moreButton = () => {
      if (groups.length < groupsCutoff) return
      return <button style={{marginLeft: 'auto'}} className='button-light'>
        More
      </button>
    }

    return <div ref='widget' className='RelatedGroupsWidget'>
      {groupNodes}
    </div>
  }
}
