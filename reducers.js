var cookies = require('js-cookie')

const update = function (state, data) {
  let title = data
  return Object.assign({}, state, { title })
}

const registerComplete = function (state, data) {
  state = Object.assign({}, state)
  state.auth = data
  state.title = `welcome, ${data.key}`
  cookies.set('token', state.auth.token, { path: '', expires: 30 })
  return state
}

const updateLoginEmail = function (state, data) {
  state = Object.assign({}, state)
  state.login.email = data
  return state
}

const updateLoginPassword = function (state, data) {
  state = Object.assign({}, state)
  state.login.password = data
  return state
}

const loginComplete = function (state, data) {
  state = Object.assign({}, state)
  state.auth = data
  state.title = `welcome, ${data.key}`
  cookies.set('token', state.auth.token, { path: '', expires: 30 })
  return state
}

const logoutComplete = function (state, data) {
  state = Object.assign({}, state)
  state.auth = {
    key: null,
    token: null
  }
  state.title = `Welcome!`
  cookies.remove('token', { path: '' })
  return state
}

module.exports = {
  update,
  registerComplete,
  updateLoginEmail,
  updateLoginPassword,
  loginComplete,
  logoutComplete
}
