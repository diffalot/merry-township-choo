const effects = require('./effects')
const reducers = require('./reducers')
const subscriptions = require('./subscriptions')

const initialState = {
  title: 'Welcome!',
  login: {
    email: null,
    password: null
  },
  auth: {
    key: null,
    token: null
  }
}

module.exports = {
  state: initialState,
  effects,
  reducers,
  subscriptions
}
