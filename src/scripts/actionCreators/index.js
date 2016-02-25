import {
  LOGIN,
  USERS,
  AUTH_FLOW,
  REGISTER_FLOW
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

export const authenticate = genAsyncCreators(LOGIN)
export function closeLogin() {
  return { type: 'CLOSE_LOGIN' }
}

export const createOneUser = genAsyncCreators(USERS.CREATE_ONE)

export const authFlow = genSimplePayload(AUTH_FLOW)

export const registerFlow = genSimplePayload(REGISTER_FLOW)
