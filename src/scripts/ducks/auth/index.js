import I from 'immutable'
import jwt from 'jsonwebtoken'
import request from 'superagent-bluebird-promise'
import { createReducer } from '../../utils'

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_DONE = 'LOGIN_DONE'
const LOGOUT_LOCAL = 'LOGOUT_LOCAL'

const initState = I.fromJS({
  token: null,
  currentUser: null,
  isLoading: false,
  error: []
})
const auth = createReducer(initState, {
  [LOGIN_REQUEST](state, action) {
    return state.merge({
      error: [],
      isLoading: true
    })
  },
  [LOGIN_DONE](state, action) {
    const { payload, error } = action
    if (error) {
      return state.merge({
        error: payload,
        isLoading: false
      })
    }
    return state.merge({
      token: payload.token,
      currentUser: {
        id: payload.id,
        username: payload.username,
        email: payload.email
      },
      isLoading: false
    })
  },
  [LOGOUT_LOCAL](state, action) {
    return state.merge({
      token: null,
      currentUser: null
    })
  }
})

export const login = (username, password) => dispatch => {
  dispatch(loginRequest())
  request
    .post('http://localhost:4000/api/v2/login')
    .type('application/json')
    .send({
      username,
      password
    })
    .then(res => {
      const { token } = res.body.data
      dispatch(loginDone(null, token))
    })
    .error(err => {
      dispatch(loginDone(err.body))
    })
}

export const loginLocal = token => dispatch => {
  dispatch(loginDone(null, token))
}

export const logoutLocal = () => {
  localStorage.removeItem('token')
  return {
    type: LOGOUT_LOCAL,
    payload: null
  }
}

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
    payload: null
  }
}

const loginDone = (err, token) => {
  if (err) {
    return {
      type: LOGIN_DONE,
      payload: err.errors,
      error: true
    }
  }

  localStorage.setItem('token', token)
  const { id, username, email } = JSON.parse(jwt.decode(token).sub)
  return {
    type: LOGIN_DONE,
    payload: {
      token,
      id,
      username,
      email
    }
  }
}

export default auth
