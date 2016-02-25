const API_ROOT = process.env.API_ROOT || 'http://localhost:4000/api/v2'

function parseJSON(res) {
  return res.json()
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) return res

  const err = new Error(res.statusText)
  err.response = res
  throw err
}

function post(body) {
  return {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}

export function authenticate(body) {
  const url = `${API_ROOT}/login`
  return fetch(url, post(body))
    .then(checkStatus)
    .then(parseJSON)
}

export function createOneUser(body) {
  const url = `${API_ROOT}/users`
  return fetch(url, post(body))
    .then(checkStatus)
    .then(parseJSON)
}
