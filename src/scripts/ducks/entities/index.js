import { combineReducers } from 'redux'
import thoughts from './thoughts'
import * as thoughtActs from './thoughts'
import notes from './notes'
import * as noteActs from './notes'
import groups from './groups'
import * as groupActs from './groups'

const entities = combineReducers({
  thoughts,
  notes,
  groups
})

export {
  thoughtActs,
  noteActs,
  groupActs
}

export default entities
