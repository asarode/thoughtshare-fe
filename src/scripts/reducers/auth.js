import I from 'immutable'
import { createReducer } from '../../utils'

import { LOGIN, LOGOUT } from '../actionCreators'

const initState = I.fromJS({
  docs: {
    token: null,
    currentUser: null,
  },
  CREATE_ONE: {
    isLoading: false,
    errors: []
  }
})

const auth = createReducer(initState, {
  [LOGIN.CREATE_ONE.REQUEST](state, action) {
    return state
    .mergeIn(['CREATE_ONE'], {
      errors: [],
      isLoading: true
    })
  },
  [LOGIN.CREATE_ONE.SUCCESS](state, { payload }) {
    return state
    .mergeIn(['data'], {
      token: payload.token,
      currentUser: {
        id: payload.id,
        username: payload.username,
        email: payload.email
      }
    })
  },
  [LOGIN.CREATE_ONE.FAIL](state, action) {
    return state
    .setIn(['CREATE_ONE', 'errors'], payload)
  },
  [LOGIN.CREATE_ONE.COMPLETE](state, action) {
    return state
    .setIn(['CREATE_ONE', 'isLoading'], false)
  }
})

export default auth
