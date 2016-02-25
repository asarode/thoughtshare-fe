export function save(token) {
  localStorage.setItem('token', token)
  console.log(localStorage.getItem('token'))
}

export function purge() {
  localStorage.removeItem('token')
}
