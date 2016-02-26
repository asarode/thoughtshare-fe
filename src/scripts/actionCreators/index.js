import {
  LOGIN,
  LOGOUT,
  USERS,
  AUTH_FLOW,
  LOGOUT_FLOW,
  REGISTER_FLOW,
  PROCESS_TOKEN_FLOW
} from '../actionConstants'

function genAsyncCreators(actionGroup) {
  return {
    request(input) {
      return {
        type: actionGroup.REQUEST,
        payload: input
      }
    },
    success(data) {
      return {
        type: actionGroup.SUCCESS,
        payload: data
      }
    },
    fail(errors) {
      return {
        type: actionGroup.FAIL,
        payload: errors
      }
    },
    complete() {
      return {
        type: actionGroup.COMPLETE
      }
    }
  }
}

function genSimplePayload(key) {
  return payload => ({
    payload,
    type: key
  })
}

function genSimple(type) {
  return () => ({ type })
}

export const authenticate = genAsyncCreators(LOGIN)
export function closeLogin() {
  return { type: 'CLOSE_LOGIN' }
}

export const createOneUser = genAsyncCreators(USERS.CREATE_ONE)

export const authFlow = genSimplePayload(AUTH_FLOW)

export const processTokenFlow = genSimple(PROCESS_TOKEN_FLOW)

export const registerFlow = genSimplePayload(REGISTER_FLOW)

export const logoutFlow = genSimple(LOGOUT_FLOW)

export const logout = genSimple(LOGOUT)
