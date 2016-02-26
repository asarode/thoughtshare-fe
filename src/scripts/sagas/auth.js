import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as api from '../api'
import {
  authenticate,
  createOneUser,
  closeLogin,
  logout
} from '../actionCreators'
import {
  AUTH_FLOW,
  REGISTER_FLOW,
  LOGOUT_FLOW,
  PROCESS_TOKEN_FLOW
} from '../actionConstants'
import jwt from 'jsonwebtoken'
import { tokenStorage } from '../utils'

function* processTokenFlow() {
  const token = yield call(tokenStorage.get)
  if (!token) return

  const { id, username, email } = JSON.parse(jwt.decode(token).sub)
  yield put(authenticate.success({ token, id, username, email }))
}

function* loginFlow({ payload }) {
  yield put(authenticate.request())
  try {
    const res = yield api.authenticate({
      username: payload.username,
      password: payload.password
    })
    const { token } = res.data
    yield call(tokenStorage.set, token)
    yield call(processTokenFlow)
    yield put(authenticate.complete())
    yield put(closeLogin())
  } catch(err) {
    console.error(err)
    yield put(authenticate.complete())
    yield put(authenticate.fail(err.errors))
  }
}

function* registerFlow({ payload }) {
  yield put(createOneUser.request())
  try {
    const { username, email, password } = payload
    const res = yield api.createOneUser({ username, email, password})
    yield put(createOneUser.complete())
    yield call(loginFlow, {
      payload: { username, password }
    })
  } catch(err) {
    console.error(err)
    yield put(createOneUser.complete())
    yield put(createOneUser.fail(err.errors))
  }
}

function* logoutFlow({ payload }) {
  yield call(tokenStorage.remove)
  yield put(logout())
}

export function* watchLogin() {
  yield* takeLatest(AUTH_FLOW, loginFlow)
}

export function* watchRegister() {
  yield* takeLatest(REGISTER_FLOW, registerFlow)
}

export function* watchLogout() {
  yield* takeLatest(LOGOUT_FLOW, logoutFlow)
}

export function* watchProcessToken() {
  yield* takeLatest(PROCESS_TOKEN_FLOW, processTokenFlow)
}
