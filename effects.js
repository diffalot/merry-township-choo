const api = require('./api')

const register = function (state, data, send, done) {
  api.register(state.login, function (err, response) {
    if (err) return done(err)
    send('location:set', 'profile', function (err) {
      send('registerComplete', response, function (err, value) {
        if (err) return done(err)
        done(null, value)
      })
    })
  })
}

const login = function (state, data, send, done) {
  api.login(state.login, function (err, response) {
    if (err) return done(err)
    send('location:set', 'profile', function (err) {
      send('loginComplete', response, function (err, value) {
        if (err) return done(err)
        done(null, value)
      })
    })
  })
}

const logout = function (state, data, send, done) {
  api.logout({token: state.auth.token}, function (err, response) {
    if (err) return done(err)
    send('location:set', '/', function (err) {
      send('logoutComplete', response, function (err, value) {
        if (err) return done(err)
        done(null, value)
      })
    })
  })
}

const verifyToken = function (state, data, send, done) {
  api.verify({token: state.auth.token}, function (err, response) {
    if (err || !response.valid) {
      send('logout', '/', function (err) {
        if (err) return done(err)
        done(null)
      })
    } else {
      done(null)
    }
  })
}

const getProfile = function (state, data, send, done) {
  console.log('getting profile')
  api.verify({token: state.auth.token}, function (err, response) {
    if (err || !response.valid) {
      send('setProfile', '/', function (err) {
        if (err) return done(err)
        done(null)
      })
    } else {
      done(null)
    }
  })
}

module.exports = {
  register,
  login,
  logout,
  verifyToken,
  getProfile
}
