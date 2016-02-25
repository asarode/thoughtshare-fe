import { combineReducers } from 'redux'
import auth from '../reducers/auth'
import entities from './entities'
import ui from './ui'

const rootReducer = combineReducers({
  auth,
  entities,
  ui
})

export default rootReducer
