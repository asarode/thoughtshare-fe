import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as api from '../api'
import {
  authenticate,
  createOneUser,
  closeLogin
} from '../actionCreators'
import {
  AUTH_FLOW,
  REGISTER_FLOW
} from '../actionConstants'
import jwt from 'jsonwebtoken'
import { tokenStorage } from '../utils'

function* loginFlow({ payload }) {
  put(authenticate.request())
  try {
    const res = yield api.authenticate({
      username: payload.username,
      password: payload.password
    })
    const { token } = res.data
    call(tokenStorage.save, token)
    const { id, username, email } = JSON.parse(jwt.decode(token).sub)
    put(authenticate.success({ token, id, username, email }))
    yield put(closeLogin())
  } catch(err) {
    console.error(err)
    yield put(authenticate.fail(err.errors))
  }
}

function* registerFlow({ payload }) {
  yield put(createOneUser.request())
  try {
    const res = yield api.createOneUser({
      username: payload.username,
      email: payload.email,
      password: payload.password
    })
    yield call(loginFlow, {
      payload: { username, password }
    })
  } catch(err) {
    console.error(err)
    yield put(createOneUser.fail(err.errors))
  }
}

function* logoutFlow({ type, payload }) {

}

export function* watchLogin() {
  yield* takeLatest(AUTH_FLOW, loginFlow)
}

export function* watchRegister() {
  yield* takeLatest(REGISTER_FLOW, registerFlow)
}

export function* watchLogout() {
  yield* takeLatest('LOGOUT', logoutFlow)
}
