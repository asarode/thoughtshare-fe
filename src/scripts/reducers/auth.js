import I from 'immutable'
import { createReducer } from '../../utils'

import { LOGIN, LOGOUT } from '../actionConstants'

const initState = I.fromJS({
  docs: {
    token: null,
    currentUser: null,
  },
  isLoading: false,
  errors: []
})

const auth = createReducer(initState, {
  [LOGIN.REQUEST](state, action) {
    return state
    .merge({
      errors: [],
      isLoading: true
    })
  },
  [LOGIN.SUCCESS](state, { payload }) {
    return state
    .mergeIn(['docs'], {
      token: payload.token,
      currentUser: {
        id: payload.id,
        username: payload.username,
        email: payload.email
      }
    })
  },
  [LOGIN.FAIL](state, action) {
    return state
    .set('errors', payload)
  },
  [LOGIN.COMPLETE](state, action) {
    return state
    .set('isLoading', false)
  }
})

export default auth
