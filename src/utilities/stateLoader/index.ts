export const initialAuth = {
  user: null,
  token: '',
}

export const authKey = 'fplAppAuth'

const StateLoader = {
  saveAuth: (auth) => {
    const { token, user } = auth
    localStorage.setItem(authKey, JSON.stringify({ token, user }))
  },
  getAuth: () => {
    const authKeyValue = localStorage.getItem(authKey)
    const { ...auth } = authKeyValue ? JSON.parse(authKeyValue) : {}

    return {
      ...auth
    }
  },
  deleteAuth: () => {
    localStorage.removeItem(authKey)
  }
}

export default StateLoader
