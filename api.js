const http = require('xhr')

const AUTH_URL = process.env.AUTH_URL
const PROFILE_URL = process.env.PROFILE_URL

const register = function (options, cb) {
  post(`${AUTH_URL}/register`, options, cb)
}

const login = function (options, cb) {
  post(`${AUTH_URL}/login`, options, cb)
}

const logout = function (options, cb) {
  post(`${AUTH_URL}/logout`, options, cb)
}

const verify = function (options, cb) {
  post(`${AUTH_URL}/verify`, options, cb)
}

const sendReset = function (options, cb) {
  post(`${AUTH_URL}/send_reset`, options, cb)
}

const resetPassword = function (options, cb) {
  post(`${AUTH_URL}/resetPassword`, options, cb)
}

const getProfile = function (options, token, cb) {
  authedGet(`${PROFILE_URL}/profile`, token, options, cb)
}

module.exports = {
  register,
  login,
  logout,
  verify,
  sendReset,
  resetPassword,
  getProfile
}

function post (url, object, cb) {
  http.post(url, {
    json: true,
    body: object
  }, function (err, res, body) {
    cb(err, body)
  })
}

function authedGet (url, token, object, cb) {
  http.get(url, {
    headers: {
      Authorization: token
    }
  }, function (err, res, body) {
    cb(err, body)
  })
}
