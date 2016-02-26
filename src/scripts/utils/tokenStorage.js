export function get() {
  return localStorage.getItem('@@THOUGHT_SHARE_TOKEN')
}

export function set(token) {
  localStorage.setItem('@@THOUGHT_SHARE_TOKEN', token)
}

export function remove() {
  localStorage.removeItem('@@THOUGHT_SHARE_TOKEN')
}
