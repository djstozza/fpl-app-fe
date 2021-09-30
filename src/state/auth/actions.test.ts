import * as actions from './actions'

const email = 'user@example.com'
const password = 'password'
const username = 'user 1'

describe('Auth actions', () => {
  test('initializeAuth', () => {
    expect(actions.initializeAuth()).toEqual({ type: actions.INITIALIZE_AUTH })
  })

  test('logIn', () => {
    const user = { email, password }
    expect(actions.logIn({ user })).toEqual({ type: actions.API_SESSIONS_CREATE, user })
  })

  test('signUp', () => {
    const user = { email, password, username }
    expect(actions.signUp({ user })).toEqual({ type: actions.API_USERS_CREATE, user })
  })

  test('updateSession', () => {
    expect(actions.updateSession()).toEqual({ type: actions.API_SESSIONS_UPDATE })
  })

  test('updateUser', () => {
    const user = { email, username }
    expect(actions.updateUser({ user })).toEqual({ type: actions.API_USERS_UPDATE, user })
  })

  test('changePassword', () => {
    const user = { password, newPassword: 'newPassword' }
    expect(actions.changePassword({ user })).toEqual({ type: actions.API_PASSWORDS_UPDATE, user })
  })

  test('logOut', () => {
    expect(actions.logOut()).toEqual({ type: actions.LOG_OUT })
  })
})
