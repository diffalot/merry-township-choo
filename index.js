const html = require('choo/html')
const choo = require('choo')
const persist = require('choo-persist')

const hooks = {
  onStateChange: state => console.log(state),
  onError: err => console.log(error)
}

const app = choo(hooks)

app.model(require('./model'))

app.router({ default: '/404' }, [
  [ '/', wrapper(home) ],
  [ '/register', wrapper(register) ],
  [ '/login', wrapper(login) ],
  [ '/profile', wrapper(profile) ]
])

function wrapper (view) {
  return function (state, prev, send) {
    let menu = [
      { href: "/", name: 'home' }
    ]
    if (state.auth.token) {
      menu.push({href: 'profile', name: 'profile'})
    } else {
      menu.push({href: 'register', name: 'sign up'})
      menu.push({href: 'login', name: 'sign in'})
    }
    function logoutButton () {
      if (state.auth.token) {
        return html`<li><a href="" onclick=${logout}>log out</a>`
      }
    }
    function logout () {
      send('logout')
    }
    return html`
      <div class="container">
        <h1>${state.title}</h1>
        <ul>
          ${menu.map(function (item) {
            return html`<li><a href=${item.href}>${item.name}</a>`
          })}
          ${ logoutButton() }
        </ul>
        ${ view(state, prev, send) }
        <p>footer</p>
      </div>
    `
  }
}

function home (state, prev, send) {
  return html`
   <p>home page</p>
  `
}

function profile (state, prev, send) {
  return html`
   <p>profile page</p>
  `
}

function register (state, prev, send) {
  return html`
    <main>
      <h2>Sign Up</h2>
      <input type="email" oninput=${updateEmail} />
      <input type="password" oninput=${updatePassword} />
      <input type="submit" onclick=${register} value="sign up" />
    </main>
  `

  function updateEmail (e) {
    send('updateLoginEmail', e.target.value)
  }

  function updatePassword (e) {
    send('updateLoginPassword', e.target.value)
  }

  function register (e) {
    send('register')
  }
}

function login (state, prev, send) {
  return html`
    <main>
      <h2>Log In</h2>
      <input type="email" oninput=${updateEmail} />
      <input type="password" oninput=${updatePassword} />
      <input type="submit" onclick=${login} value="sign in" />
    </main>
  `

  function updateEmail (e) {
    send('updateLoginEmail', e.target.value)
  }

  function updatePassword (e) {
    send('updateLoginPassword', e.target.value)
  }

  function login (e) {
    send('login')
  }
}

const storageOptions = {
  filter: function (state) {
    state = Object.assign({}, state)
    delete state.login
    return state
  }
}

persist(storageOptions, (persist) => {
  app.use(persist)
  const tree = app.start()
  document.body.appendChild(tree)
})
