import I from 'immutable'
import jwt from 'jsonwebtoken'
import request from 'superagent-bluebird-promise'
import { createReducer } from '../../utils'

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_DONE = 'LOGIN_DONE'
const LOGOUT_LOCAL = 'LOGOUT_LOCAL'
const CREATE_REQUEST = 'CREATE_REQUEST_USER'
const CREATE_DONE = 'CREATE_DONE_USER'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGIN_COMPLETE = 'LOGIN_COMPLETE'

const initState = I.fromJS({
  token: null,
  currentUser: null,
  isLoading: false,
  error: []
})
const auth = createReducer(initState, {
  // [CREATE_REQUEST](state, action) {
  //   return state.merge({
  //     error: [],
  //     isLoading: true
  //   })
  // },
  // [CREATE_DONE](state, action) {
  //   const { payload, error } = action
  //   if (error) {
  //     return state.merge({
  //       error: payload,
  //       isLoading: false
  //     })
  //   }
  //   return state.merge({
  //     error: [],
  //     isLoading: false
  //   })
  // },
  // [LOGIN_REQUEST](state, action) {
  //   return state.merge({
  //     error: [],
  //     isLoading: true
  //   })
  // },
  // [LOGIN_DONE](state, action) {
  //   const { payload, error } = action
  //   if (error) {
  //     return state.merge({
  //       error: payload,
  //       isLoading: false
  //     })
  //   }
  //   return state.merge({
  //     token: payload.token,
  //     currentUser: {
  //       id: payload.id,
  //       username: payload.username,
  //       email: payload.email
  //     },
  //     isLoading: false
  //   })
  // },
  // [LOGIN_SUCCESS](state, { payload }) {
  //   return state.merge({
  //     token: payload.token,
  //     currentUser: {
  //       id: payload.id,
  //       username: payload.username,
  //       email: payload.email
  //     }
  //   })
  // },
  // [LOGIN_FAIL](state, { payload }) {
  //   return state.merge({
  //     error: payload
  //   })
  // },
  // [LOGIN_COMPLETE](state, { type, payload }) {
  //   return state.merge({
  //     isLoading: false
  //   })
  // },
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

export const create = ({username, email, password}) => dispatch => {
  dispatch(createRequest())
  request
    .post('http://localhost:4000/api/v2/users')
    .type('application/json')
    .send({
      username,
      email,
      password
    })
    .then(res => {
      dispatch(login(username, password))
      dispatch(createDone(null, res.body))
    })
    .error(err => {
      dispatch(createDone(err.body))
    })
}

export const loginLocal = token => dispatch => {
  dispatch(loginDone(null, token))
}

export const logoutLocal = () => {
  localStorage.removeItem('token')
  return {
    type: LOGOUT_LOCAL
  }
}

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

const createRequest = () => ({
  type: CREATE_REQUEST
})

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

const createDone = (err, token) => {
  if (err) {
    return {
      type: CREATE_DONE,
      payload: err.errors,
      error: true
    }
  }

  return {
    type: CREATE_DONE
  }
}

export default auth
