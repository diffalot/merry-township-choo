const checkToken =  function (send, done) {
  document.addEventListener('DOMContentLoaded', send('verifyToken', done))
}

const fetchProfile =  function (send, done) {
  document.addEventListener('DOMContentLoaded', send('getProfile', done))
}

module.exports = {
  checkToken,
  fetchProfile
}
