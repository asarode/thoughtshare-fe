import I from 'immutable'
import { createReducer } from '../utils'

const initState = I.fromJS({
  docs: {},
  meta: {},
  CREATE_ONE: {
    isLoading: false,
    errors: []
  }
})

const users = createReducer(initState, {
  [USERS.CREATE_ONE.REQUEST](state, action) {
    return state
    .mergeIn(['CREATE_ONE'], {
      errors: [],
      isLoading: true
    })
  },
  [USERS.CREATE_ONE.SUCCESS](state, { payload }) {
    return state
    .setIn(['docs', payload.id], I.fromJS(payload))
    .setIn(['meta', payload.id, 'fullyLoaded'], true)
  },
  [USERS.CREATE_ONE.FAIL](state, action) {
    return state
    .setIn(['CREATE_ONE', 'errors'], payload)
  },
  [USERS.CREATE_ONE.COMPLETE](state, action) {
    return state
    .setIn(['CREATE_ONE', 'isLoading'], false)
  }
})
