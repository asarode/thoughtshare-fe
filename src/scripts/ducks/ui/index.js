import I from 'immutable'
import { createReducer, keys } from '../../utils'

const OPEN_LOGIN = 'OPEN_LOGIN'
const CLOSE_LOGIN = 'CLOSE_LOGIN'
const SWITCH_SIGN_IN = 'SWITCH_SIGN_IN'
const SWITCH_REGISTER = 'SWITCH_REGISTER'

const initState = I.fromJS({
  loginActive: false,
  isRegistering: false
})
const ui = createReducer(initState, {
  [OPEN_LOGIN](state, action) {
    return state.setIn(['loginActive'], true)
  },
  [CLOSE_LOGIN](state, action) {
    return state.setIn(['loginActive'], false)
  },
  [SWITCH_SIGN_IN](state, action) {
    return state.setIn(['isRegistering'], false)
  },
  [SWITCH_REGISTER](state, action) {
    return state.setIn(['isRegistering'], true)
  }
})

export const openLogin = () => ({
  type: OPEN_LOGIN,
  payload: null
})

export const closeLogin = () => ({
  type: CLOSE_LOGIN,
  payload: null
})

export const switchSignIn = () => ({
  type: SWITCH_SIGN_IN,
  payload: null
})

export const switchRegister = () => ({
  type: SWITCH_REGISTER,
  payload: null
})

export default ui
