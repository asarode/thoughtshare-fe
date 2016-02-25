function genAsync(key, strategy='BASIC') {
  return {
    REQUEST: gen(`${key}/${strategy}/REQUEST`),
    SUCCESS: gen(`${key}/${strategy}/SUCCESS`),
    FAIL: gen(`${key}/${strategy}/FAIL`),
    COMPLETE: gen(`${key}/${strategy}/COMPLETE`)
  }
}

function gen(key) {
  return `@@${key}`
}

function genEntity(key, ...strategies) {
  return strategies.reduce((prev, curr) => {
    prev[curr] = genAsync(key, curr)
    return prev
  }, {})
}

export const LOGIN = genAsync('LOGIN')
export const LOGOUT = gen('LOGOUT')

export const USERS = genEntity('USERS', 'CREATE_ONE')

export const AUTH_FLOW = gen('AUTH_FLOW')
export const REGISTER_FLOW = gen('REGISTER_FLOW')
