export const initialAuth = {
  user: null,
  token: '',
}

const authKey = 'fplAppAuth'

const StateLoader = {
  saveAuth: (auth) => {
    const { token } = auth
    localStorage.setItem(authKey, JSON.stringify({ token }))
  },
  getAuth: () => {
    const authKeyValue = localStorage.getItem(authKey)
    const { ...auth } = authKeyValue ? JSON.parse(authKeyValue) : {}

    return {
      ...auth
    }
  }
}

export default StateLoader
