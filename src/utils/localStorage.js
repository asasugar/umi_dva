export function setLocalStorage(key, val) {
  return window.localStorage.setItem(key, JSON.stringify(val))
}

export function getLocalStorage(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

export function removeLocalStorage(key) {
  return window.localStorage.removeItem(key)
}
